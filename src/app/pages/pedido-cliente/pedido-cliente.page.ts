import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
  standalone: false
})
export class PedidoClientePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController // Inyectamos AlertController aquí
  ) {}

  ngOnInit() {}

  volverMenu() {
    this.navCtrl.navigateForward(['/menu']);
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Pedido Confirmado',
      message: 'Tu pedido está en proceso.',
      buttons: ['OK'],
    });

    await alert.present();
    
    this.navCtrl.navigateForward(['/resumen-pedido-cliente']);
  }
}
