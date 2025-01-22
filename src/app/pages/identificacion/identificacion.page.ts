import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.page.html',
  styleUrls: ['./identificacion.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class IdentificacionPage implements OnInit {
  cantidad: number = 1;

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    rut: '',
    clave: '',
    correo: '',
    numeromesa: 0,
    cantidadpersonas: 0,
  }
  
  

  constructor(private router: Router, private servicio: UsuariosService) { }

  ngOnInit() {
  }

  onSumbit() {
    let datos = this.servicio.set(this.usuario.rut, this.usuario);
    console.log("LEYENDO");
    console.log(datos);
    if (datos !== undefined) {
      datos.then(value => {
        console.log(value);
        if (value == null) {
          this.guardar();
        }
      });
    }
  }

  async saveData() {
    await this.servicio.set(this.usuario.rut, this.usuario);
    console.log('Datos guardados');
    console.log(this.servicio);
  }


  guardar() {
    console.log("Guardado!!!");
    this.servicio.set(this.usuario.rut, this.usuario);
    this.router.navigate(['/mesa-check']);
  }

  toHome() {
    this.router.navigate(['/bienvenida'])
  }

  increment() {
    this.usuario.cantidadpersonas++;
  }

  decrement() {
    if (this.usuario.cantidadpersonas > 1) {
      this.usuario.cantidadpersonas--;
    }
  }
}
