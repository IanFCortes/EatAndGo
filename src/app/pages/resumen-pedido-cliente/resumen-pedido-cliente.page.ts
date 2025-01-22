import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-resumen-pedido-cliente',
  templateUrl: './resumen-pedido-cliente.page.html',
  styleUrls: ['./resumen-pedido-cliente.page.scss'],
  standalone: false
})
export class ResumenPedidoClientePage implements OnInit {

 constructor(
     private navCtrl: NavController,
     private alertController: AlertController // Inyectamos AlertController aquí
   ) {}

  ngOnInit() {
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
