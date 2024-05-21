export interface ProcessoView {
  id : number;
  npu : string;
  dataCadastro : string[];
  dataVisualizacao : string[];
  municipio : string;
  uf: string;
  documentoPdf : Blob;
}
