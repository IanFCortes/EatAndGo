import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen-pedido-cliente',
  templateUrl: './resumen-pedido-cliente.page.html',
  styleUrls: ['./resumen-pedido-cliente.page.scss'],
  standalone: false
})
export class ResumenPedidoClientePage implements OnInit {

  usuario: any = null;
  numeromesa: number = 1;
  
  constructor(
    private navCtrl: NavController, 
    private storage: Storage,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }

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


      // ✅ Formatea la fecha solo si existe y es válida
      if (this.usuario.fechayhora) {
        const fecha = new Date(this.usuario.fechayhora);
        this.usuario.fechayhora = isNaN(fecha.getTime()) ? 'No disponible' : fecha.toLocaleString();
      }

    } catch (error) {
      console.error('❌ Error al recuperar datos:', error);
    }
  }

  async pedidoPagado() {
    const alert = await this.alertController.create({
      header: 'Has Pagado tu Pedido',
      subHeader: '¡Gracias por tu compra!',
      buttons: ['OK'],
    });

    await alert.present();

    this.navCtrl.navigateForward(['/historial-pedidos-cliente']);
  }
}
