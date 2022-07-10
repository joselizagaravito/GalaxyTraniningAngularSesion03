import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../../service/articulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo-crear',
  templateUrl: './articulo-crear.component.html',
  styleUrls: ['./articulo-crear.component.css'],
})
export class ArticuloCrearComponent implements OnInit {
  createArticulo!: FormGroup;
  submited: boolean = false;

  constructor(
    fromBuilder: FormBuilder,
    private articuloService: ArticuloService,
    private router: Router
  ) {
    this.createArticulo = fromBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      costo: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  agregarArticulo() {
    this.submited = true;
    if (this.createArticulo.invalid) return;
    const articulo: Articulo = {
      idArticulo: this.createArticulo.value.idArticulo,
      nombre: this.createArticulo.value.nombre,
      precio: this.createArticulo.value.precio,
      costo: this.createArticulo.value.costo,
      fechaRegistro: this.createArticulo.value.fechaRegistro,
    };
    this.articuloService
      .postArticulo(articulo)
      .subscribe((res) => this.router.navigate(['/pages/articulolistar']));
  }
}
