import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NavController } from '@ionic/angular';


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
    correo: '',
    numeromesa: 0,
    cantidadpersonas: 0,
    fechayhora: '',
  }
  
  

  constructor(private navCtrl: NavController, private servicio: UsuariosService) { }

  ngOnInit() {
  }

  async onSubmit() {
    console.log("Guardando datos...");
  
    // Guarda los datos en el almacenamiento
    await this.servicio.set(this.usuario.rut, this.usuario);
  
    console.log("Datos guardados. Ahora intentando leer...");
  
    // Espera la lectura de los datos
    const datos = await this.servicio.get(this.usuario.rut);
    
    console.log("Datos recuperados:", datos);
  
    if (datos == null) {
      console.error("❌ No se encontraron los datos guardados. Revisa la clave o si el almacenamiento está funcionando.");
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
    this.navCtrl.navigateForward(['/mesa-check']);
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
