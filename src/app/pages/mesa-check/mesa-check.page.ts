import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';

@Component({
  selector: 'app-mesa-check',
  templateUrl: './mesa-check.page.html',
  styleUrls: ['./mesa-check.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, FormsModule],
})
export class MesaCheckPage implements OnInit {
  numeroMesa: number = 1;
  mesaCheckForm!: FormGroup;
  nuevoUsuario: any;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Recuperar datos del LocalStorage
    const data = localStorage.getItem('reserva');
    if (data) {
      this.nuevoUsuario = JSON.parse(data);
      console.log('Datos recuperados:', this.nuevoUsuario);

      // Rellenar el formulario o usar directamente los datos
      this.mesaCheckForm = this.fb.group({
        mesa: ['', Validators.required],
        nuevoUsuario: [
          '${this.nuevoUsuario.nombre} ${this.nuevoUsuario.apellido}',
          Validators.required,
        ],
      });

    } else {
      console.warn('No hay datos registrados en LocalStorage');
    }
  }

  confirmarMesa() {
    this.router.navigate(['/menu']);
  }

  paginaAnterior() {
    this.router.navigate(['/..']);
  }

  onSubmit() {
    if (this.mesaCheckForm.valid) {
      console.log('Formulario válido:', this.mesaCheckForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}