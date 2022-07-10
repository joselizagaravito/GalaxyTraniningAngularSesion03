import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Articulo } from '../pages/models/articulo.model';
import { Observable } from 'rxjs';
import { PaginaArticulos } from '../pages/models/pagina-articulos.model';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  URL: string = 'http://localhost:5266/articulo/';
  articulo!: Articulo;
  ruta!: string;

  constructor(private http: HttpClient) {}

  getArticulos<PaginaArticulos>(
    npag: number,
    rxpag: number
  ): Observable<PaginaArticulos> {
    const httpParams = new HttpParams({
      fromObject: {
        nropag: npag,
        regxpag: rxpag,
      },
    });
    return this.http.get<PaginaArticulos>(this.URL, { params: httpParams });
  }

  getArticulo(id: string): Observable<Articulo> {
    return this.http.get<Articulo>(this.URL+id);
  }

  postArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.URL,articulo);
  }

}
