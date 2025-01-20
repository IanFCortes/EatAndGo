import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';




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
    correo: '',
    numeromesa: 0,
    cantidadpersonas: 0,
    fechayhora: Date,
  }

  eventoFecha: string = '';


  constructor(private router: Router, private fb: FormBuilder) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      numeromesa: ['', Validators.required],
      cantidadpersonas: ['', Validators.required],

      //fechayhora: ['', Validators.required]
    });
  }



  onSubmit() {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.apellido && this.nuevoUsuario.correo && this.nuevoUsuario.rut) {

      IonicStorageModule.setItem('reserva', JSON.stringify(this.nuevoUsuario));
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
    this.nuevoUsuario.cantidadpersonas++;
  }

  decrement() {
    if (this.nuevoUsuario.cantidadpersonas > 1) {
      this.nuevoUsuario.cantidadpersonas--;
    }
  }
}
