import { Usuario } from '../../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';



@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.page.html',
  styleUrls: ['./identificacion.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class IdentificacionPage implements OnInit {

  form: any;

  ngOnInit() {
  }
  

  cantidad: number = 1; // Valor inicial

  nuevoUsuario: Usuario = {
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
  };

  constructor(private router: Router, private fb: FormBuilder,private usuarioService: UsuarioService) { 

    this.form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rut: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
  }); }

  clientes: Usuario[] = []; // Arreglo para almacenar usuarios

  onSubmit() {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.apellido && this.nuevoUsuario.rut && this.nuevoUsuario.correo) {
      this.usuarioService.guardarUsuario(this.nuevoUsuario); // Guardar datos en el servicio
      this.router.navigate(['/mesa-check']); // Navegar a la página donde se muestran
    } else {
      console.error('Formulario no válido.');
    }
  }

toHome() {
  this.router.navigate(['/bienvenida'])
}

increment() {
  this.cantidad++;
}

decrement() {
  if (this.cantidad > 1) {
    this.cantidad--;
  }
}
}
