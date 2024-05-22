import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ProcessoService } from '../../../service/processo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processo-list',
  templateUrl: './processo-list.component.html',
  styleUrls: ['./processo-list.component.css'],
})
export class ProcessoListComponent implements OnInit {
  displayedColumns: string[] = ['npu', 'uf', 'municipio', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalElements = 0;
  pageSize = 5;
  currentPage = 0;

  constructor(
    private http: HttpClient,
    private _processoService: ProcessoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadProcessos(this.currentPage, this.pageSize);
  }

  loadProcessos(page: number, size: number): void {
    this._processoService.getProcessos(page, size).subscribe(
      (data) => {
        this.dataSource.data = data.content;
        this.totalElements = data.totalElements;
      },
      (error) => {
        console.error('Erro ao carregar os processos', error);
      }
    );
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProcessos(this.currentPage, this.pageSize);
  }

  detalharProcesso(id: number): void {
    this._router.navigate(['/processo-view', id]);
  }

  editarProcesso(id: number): void {
    this._router.navigate(['/processo-edit', id]);
  }

  deletarProcesso(id: number): void {
    if (confirm('Tem certeza que deseja deletar este processo?')) {
      this.http.delete(`http://localhost:8080/api/processos/${id}`).subscribe(
        () => {
          alert('Processo deletado com sucesso');
          this.loadProcessos(this.currentPage, this.pageSize);
        },
        (error) => {
          console.error('Erro ao deletar o processo', error);
        }
      );
    }
  }

  voltar() {
    this._router.navigate(['/home']);
  }
}
