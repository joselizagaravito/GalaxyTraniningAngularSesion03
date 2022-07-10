import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../../service/articulo.service';
import { ThisReceiver } from '@angular/compiler';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articulo-editar',
  templateUrl: './articulo-editar.component.html',
  styleUrls: ['./articulo-editar.component.css'],
})
export class ArticuloEditarComponent implements OnInit {
  IdArticulo: string | null;
  articulo!: Articulo;

  editarArticulo!: FormGroup;
  submited: boolean = false;

  constructor(
    private articuloService: ArticuloService,
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute
  ) {
    this.editarArticulo = this.formBuilder.group({
      idArticulo: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      costo: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
    });
    this.IdArticulo = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarRegistro();
  }

  cargarRegistro(): void {
    if (this.IdArticulo) {
      console.log('IdArticulo: ' + this.IdArticulo);
      this.articuloService
        .getArticulo(this.IdArticulo)
        .subscribe(registro => (this.articulo = registro));
      console.log('registro: ' + this.articulo);
    }
  }

  guardarArticulo() {
    this.submited = true;
    if (this.editarArticulo.invalid) return;
    const art: Articulo = {
      idArticulo: this.editarArticulo.value.idArticulo,
      nombre: this.editarArticulo.value.nombre,
      precio: this.editarArticulo.value.precio,
      costo: this.editarArticulo.value.costo,
      fechaRegistro: this.editarArticulo.value.fechaRegistro,
    };
    console.log(art);
  }
}
