import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessoService } from '../../../service/processo.service';
import { ActivatedRoute } from '@angular/router';
import { ProcessoUpdate } from '../../../interfaces/processo-update';
import { ProcessoView } from '../../../interfaces/processo-view';
import { Municipio } from '../../../interfaces/municipio';
import { Estado } from '../../../interfaces/estado';
import { IBGEService } from '../../../service/ibge.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-processo-edit',
  templateUrl: './processo-edit.component.html',
  styleUrls: ['./processo-edit.component.css'],
})
export class ProcessoEditComponent implements OnInit, OnDestroy {
  processoForm!: FormGroup;
  processoId: number = 0;
  downloadUrl!: string;
  processo!: ProcessoView;
  pdfBlob!: Blob;
  ufs: Estado[] = [];
  municipios: Municipio[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _processoService: ProcessoService,
    private route: ActivatedRoute,
    private _IBGEService: IBGEService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.processoId = +params['id'];

      this.subscriptions.add(
        this._processoService.getById(this.processoId).subscribe((processo: ProcessoView) => {
          this.processo = processo;
          this.pdfBlob = new Blob([this.processo.documentoPdf], {
            type: 'application/pdf',
          });
          this.downloadUrl = window.URL.createObjectURL(this.pdfBlob);

          this.subscriptions.add(
            this._IBGEService.loadEstados().subscribe(
              (data) => {
                this.ufs = data;

                this.loadMunicipios(this.processo.uf);

                this.processoForm = this.fb.group({
                  id: [{ value: this.processo.id, disabled: true }, Validators.required],
                  npu: [this.processo.npu, [Validators.required]],
                  municipio: [this.processo.municipio, Validators.required],
                  uf: [this.processo.uf, [Validators.required, Validators.maxLength(2)]],
                  documento: [this.processo.documentoPdf, Validators.required],
                });
              },
              (error) => {
                console.error('Erro ao carregar as UFs', error);
              }
            )
          );
        })
      );
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.processoForm.get(controlName);
    if (control!.hasError('required')) {
      return 'Este campo é obrigatório';
    } else if (control!.hasError('pattern')) {
      return 'Formato inválido';
    } else if (control!.hasError('maxlength')) {
      return 'Tamanho máximo excedido';
    }
    return '';
  }

  onSubmit(): void {
    if (this.processoForm.valid) {
      const formData = new FormData();
      const controls = this.processoForm.controls;

      let processoCreateDto = {
        id: this.processoId ,
        npu: controls['npu'].value.replace(/\D/g, ''),
        municipio: controls['municipio'].value,
        uf: controls['uf'].value,
      };

      formData.append('processoCreateDto', JSON.stringify(processoCreateDto));

      const fileInput = controls['documento'].value;
      if (fileInput && fileInput.files.length > 0) {
        formData.append('documento', fileInput.files[0]);
      }

      this._processoService.updateProcesso(formData).subscribe(
        (response) => {
          console.log('Registro criado com sucesso:', response);
          controls['npu'].setValue('');
          controls['municipio'].setValue('');
          controls['uf'].setValue('');
          controls['documento'].setValue(null);
        },
        (error) => {
          console.error('Erro ao criar o registro:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.downloadUrl) {
      window.URL.revokeObjectURL(this.downloadUrl);
    }

    // Atualizar a data de visualização do processo
    this.updateLastView();

    // Unsubscribe all subscriptions
    this.subscriptions.unsubscribe();
  }

  updateLastView(): void {
    this._processoService.updateLastView(this.processoId);
  }

  loadMunicipios(ufSigla: string): void {
    this.subscriptions.add(
      this._IBGEService.loadMunicipios(ufSigla).subscribe(
        (data) => {
          this.municipios = data;
        },
        (error) => {
          console.error('Erro ao carregar os municípios', error);
        }
      )
    );
  }
}
