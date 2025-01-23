import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  usuario: any = null;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.storage.create(); // 💡 IMPORTANTE: Inicializa Storage

    try {
      const rut = this.route.snapshot.queryParamMap.get('rut');
      console.log('🔹 RUT recibido:', rut);

      if (!rut) {
        console.error('❌ No se encontró el RUT en los parámetros.');
        return;
      }

      const datosUsuario = await this.storage.get(rut);

      if (!datosUsuario) {
        console.error('❌ No se encontraron datos en el Storage.');
        return;
      }

      console.log('✅ Usuario encontrado en Storage:', datosUsuario);
      this.usuario = datosUsuario;

      // ✅ Recupera el número de mesa dinámicamente si está almacenado
      this.usuario.numeromesa = this.usuario.numeromesa || this.usuario.numeromesa;

      // ✅ Formatea la fecha solo si existe y es válida
      if (this.usuario.fechayhora) {
        const fecha = new Date(this.usuario.fechayhora);
        this.usuario.fechayhora = isNaN(fecha.getTime()) ? 'No disponible' : fecha.toLocaleString();
      }

    } catch (error) {
      console.error('❌ Error al recuperar datos:', error);
    }
  }

  confirmarMesa() {
    console.log('✅ Mesa confirmada para:', this.usuario);
    this.navCtrl.navigateForward(['/menu']);
  }

  paginaAnterior() {
    this.navCtrl.back();
  }
}
