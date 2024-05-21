import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../interfaces/municipio';
import { Estado } from '../interfaces/estado';

@Injectable({
  providedIn: 'root',
})
export class IBGEService {
  private UF_URL : string = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private MUNICIPIOS_PREFIXO_URL = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados/';
  private MUNICIPIOS_SUFIXO_URL = '/municipios';

  constructor(private _http: HttpClient) {}

  loadEstados(): Observable<Estado[]> {
    return this._http.get<Estado[]>(this.UF_URL);
  }

  loadMunicipios(ufSigla: string): Observable<Municipio[]> {
    return this._http.get<Municipio[]>(
      this.MUNICIPIOS_PREFIXO_URL + ufSigla + this.MUNICIPIOS_SUFIXO_URL
    );
  }
}
