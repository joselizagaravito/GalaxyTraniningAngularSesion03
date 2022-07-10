import { Articulo } from './articulo.model';
export class PaginaArticulos{
  constructor(
      public totalReg: number,
      public pagActual: number,
      public regXPag : number,
      public data: Articulo[],
  ){}
}
