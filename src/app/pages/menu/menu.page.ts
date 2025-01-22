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

  paginaAnterior() {
    this.navCtrl.back();
  }

  verPedido() {
    this.navCtrl.navigateForward(['/pedido-cliente']);
  }

}
