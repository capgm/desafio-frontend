import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estado } from '../../../interfaces/estado';
import { Municipio } from '../../../interfaces/municipio';
import { IBGEService } from '../../../service/ibge.service';
import { ProcessoService } from '../../../service/processo.service';

@Component({
  selector: 'app-processo-create',
  templateUrl: './processo-create.component.html',
  styleUrls: ['./processo-create.component.css'],
})
export class ProcessoCreateComponent implements OnInit {
  processoForm: FormGroup;
  ufs: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private fb: FormBuilder,
    private _IBGEService: IBGEService,
    private _processoService: ProcessoService
  ) {
    this.processoForm = this.fb.group({
      npu: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/),
        ],
      ],
      municipio: ['', Validators.required],
      uf: ['', Validators.required],
      documento: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._IBGEService.loadEstados().subscribe(
      (data) => {
        this.ufs = data;
      },
      (error) => {
        console.error('Erro ao carregar as UFs', error);
      }
    );
  }

  getErrorMessage(controlName: string): string {
    const control = this.processoForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    } else if (control?.hasError('pattern')) {
      return 'Formato inválido';
    } else if (control?.hasError('maxlength')) {
      return 'Tamanho máximo excedido';
    }
    return '';
  }

  onSubmit(): void {
    if (this.processoForm.valid) {
      const formData = new FormData();
      const controls = this.processoForm.controls;

      let processoCreateDto = {
        npu: controls['npu'].value.replace(/\D/g, ''),
        municipio: controls['municipio'].value,
        uf: controls['uf'].value,
      };

      formData.append('processoCreateDto', JSON.stringify(processoCreateDto));

      const fileInput = controls['documento'].value;
      if (fileInput && fileInput.files.length > 0) {
        formData.append('documento', fileInput.files[0]);
      }

      this._processoService.createProcesso(formData).subscribe(
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

  loadMunicipios(ufSigla: string): void {
    this._IBGEService.loadMunicipios(ufSigla).subscribe(
      (data) => {
        this.municipios = data;
      },
      (error) => {
        console.error('Erro ao carregar os municípios', error);
      }
    );
  }
}
