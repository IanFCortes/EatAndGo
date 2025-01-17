import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



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


  cantidad: number = 1;

  nuevoUsuario = {
    nombre: '',
    apellido: '',
    rut: '',
    correo: ''
  }

  nuevaMesa = {
    personasCantidad: 0,
    fechayhora: Date,
  }

  eventoFecha: string = '';


  constructor(private router: Router, private fb: FormBuilder) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }



  onSubmit() {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.apellido && this.nuevoUsuario.correo && this.nuevoUsuario.rut) {

      localStorage.setItem('reserva', JSON.stringify(this.nuevoUsuario));
      this.router.navigate(['/mesa-check']); 
    }else

      this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });
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
