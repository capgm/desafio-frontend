import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessoView } from '../../../interfaces/processo-view';
import { ProcessoService } from '../../../service/processo.service';

@Component({
  selector: 'app-processo-view',
  templateUrl: './processo-view.component.html',
  styleUrl: './processo-view.component.css',
})
export class ProcessoViewComponent implements OnInit {
  processoId: number = 0;
  downloadUrl!: string;
  processo!: ProcessoView;
  pdfBlob!: Blob;

  constructor(
    private route: ActivatedRoute,
    private _processoService: ProcessoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.processoId = +params['id'];

      this._processoService
        .getById(this.processoId)
        .subscribe((processo: ProcessoView) => {
          this.processo = processo;

          this.downloadUrl = this.processo.documentoPdf
        });
    });
  }

  ngOnDestroy(): void {
    // Atualizar a data de visualização do processo
    this.updateLastView();
  }

  updateLastView(): void {
    this._processoService.updateLastView(this.processoId);
  }

  voltar(){
    this._router.navigate(['/processo-lista']);
  }
}
