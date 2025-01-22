import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mesa-check',
  templateUrl: './mesa-check.page.html',
  styleUrls: ['./mesa-check.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MesaCheckPage implements OnInit {

  numeroMesa: number = 1;

  usuario: any = null;

  constructor(
    private navCtrl: NavController,private storage: Storage
  ) { }

   async ngOnInit() {
    const rut = "12345678-9"; // 🔹 Asegúrate de usar el RUT correcto
    this.usuario = await this.storage.get(rut);

    if (this.usuario && this.usuario.fechayhora) {
      // Formatea la fecha en un formato legible
      this.usuario.fechayhora = new Date(this.usuario.fechayhora).toLocaleString();
    }


    if (!this.usuario) {
      console.error("❌ No se encontraron datos en el Storage.");
    } else {
      console.log("✅ Datos recuperados:", this.usuario);
    }
  }


  confirmarMesa() {
    this.navCtrl.navigateForward(['/menu']);
  }

  paginaAnterior() {
    this.navCtrl.back();
  }

  onSubmit() {
    
  }
}