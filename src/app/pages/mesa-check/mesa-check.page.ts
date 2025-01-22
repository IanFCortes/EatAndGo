import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
    private navCtrl: NavController,private storage: Storage, private route: ActivatedRoute
  ) { }

   async ngOnInit() {
    // Recupera el RUT desde queryParams si es necesario
    const rut = this.route.snapshot.queryParamMap.get('rut');
    console.log('RUT recibido:', rut);
 
    // Recupera los datos del usuario desde Ionic Storage
    if (rut) {
      this.usuario = await this.storage.get(rut);
      console.log('Usuario encontrado en Storage:', this.usuario);
    } else {
      console.error('No se encontró el RUT en los parámetros.');
    }

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