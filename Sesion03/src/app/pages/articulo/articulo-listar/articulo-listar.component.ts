import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../../service/articulo.service';
import { PaginaArticulos } from '../../models/pagina-articulos.model';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-articulo-listar',
  templateUrl: './articulo-listar.component.html',
  styleUrls: ['./articulo-listar.component.css'],
})
export class ArticuloListarComponent implements OnInit {
  listararticulos: Articulo[] = [];
  pagActual: number = 1;
  regXPag: number = 10;
  totalReg: number = 1;
  totalPags!: number;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;

  handlePages(e: PageEvent){
    this.totalPags=e.length
    this.regXPag=e.pageSize
    this.pagActual=e.pageIndex+1

    this.cargarRegistros();
  }

  constructor(private articuloService: ArticuloService) {}

  ngOnInit(): void {
    //this.articuloService.getArticulos().subscribe(res => console.log(res));
    this.cargarRegistros();
  }
  cargarRegistros() {
    this.articuloService
      .getArticulos<PaginaArticulos>(this.pagActual, this.regXPag)
      .subscribe((res) => {
        this.listararticulos = res.data;
        this.pagActual = res.pagActual;
        this.regXPag = res.regXPag;
        this.totalReg = res.totalReg;
        if (this.totalReg % this.regXPag > 0)
          this.totalPags = Math.round(this.totalReg / this.regXPag) + 1;
        else this.totalPags = Math.round(this.totalReg / this.regXPag);
      });
  }
  cambiarPagina(valor: number): void {
    this.pagActual += valor;
    if (this.pagActual <= 0) this.pagActual = 1;
    if (this.pagActual >= this.totalPags) this.pagActual = this.totalPags;
    this.cargarRegistros();
  }
}
