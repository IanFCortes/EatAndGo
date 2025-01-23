import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  confirmarPedido () {
    console.log('Pedido confirmado');
    this.navCtrl.navigateForward(['/resumen-pedido-cliente']);
  }

  toHome() {
    this.navCtrl.navigateForward(['/bienvenida']);
  }

  verPedido() {
    this.navCtrl.navigateForward(['/pedido-cliente'], {
      queryParams: { rut: '11111111-1' }
    });
  }

}
