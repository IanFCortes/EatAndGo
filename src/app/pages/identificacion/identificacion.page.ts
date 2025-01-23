import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.page.html',
  styleUrls: ['./identificacion.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule, ReactiveFormsModule]
})
export class IdentificacionPage implements OnInit {
  cantidad: number = 1;

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    cantidadpersonas: 0,
    fechayhora: '',
    esAdmin: false,
  }
  
  

  constructor(private navCtrl: NavController, private servicio: UsuariosService,private storage: Storage) { }

  ngOnInit() {
  }

  
  async onSubmit() {
    console.log("Guardando datos...");
  
    // Espera la lectura de los datos
    const datos = await this.servicio.get(this.usuario.rut);
    
    console.log("Datos recuperados:", datos);
  
    if (datos == null) {
      console.error("❌ No se encontraron los datos guardados.");
    } else {
      console.log("✅ Datos encontrados:", datos);
    }

    this.guardar();
  }

  async saveData() {
    await this.servicio.set(this.usuario.rut, this.usuario);
    console.log('Datos guardados');
    console.log(this.servicio);
  }


  guardar() {
    console.log("Guardado!!!");
    this.servicio.set(this.usuario.rut, this.usuario);
    this.navCtrl.navigateForward(['/mesa-check'], {
      queryParams: {
        rut: this.usuario.rut // Asegúrate de pasar el RUT correctamente
      }
    });
  }

  toHome() {
    this.navCtrl.navigateForward(['/bienvenida'])
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
