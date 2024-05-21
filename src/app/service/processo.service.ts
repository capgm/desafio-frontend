import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessoView } from '../interfaces/processo-view';
import { ProcessoUpdate } from '../interfaces/processo-update';

@Injectable({
  providedIn: 'root',
})
export class ProcessoService {
  private baseUrl = 'http://localhost:8080/api/processos';

  constructor(private http: HttpClient) {}

  getProcessos(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  deleteProcesso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: number): Observable<ProcessoView> {
    return this.http.get<ProcessoView>(`${this.baseUrl}/${id}`);
  }

  createProcesso(formData: FormData): Observable<object> {
    return this.http.post(this.baseUrl, formData);
  }

  updateProcesso(processoUpdate: FormData): Observable<any> {
    const processoUrl = `${this.baseUrl}`;
    return this.http.put(processoUrl, processoUpdate);
  }

  updateLastView(id: number): void {
    this.http.put(`${this.baseUrl}/${id}/atualizar-visualizacao`, {}).subscribe(
      (response) => {
        console.log('Data de visualização atualizada com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao atualizar a data de visualização:', error);
      }
    );
  }
}
