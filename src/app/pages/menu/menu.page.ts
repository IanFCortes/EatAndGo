import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MenuPage implements OnInit {

  usuario: any = null;
  rutb: any;
  constructor(private navCtrl: NavController, private storage: Storage, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.storage.create();

    try {
      const rut = this.route.snapshot.queryParamMap.get('rut');
      console.log('🔹 RUT recibido:', rut);

      if (!rut) {
        console.error('❌ No se encontró el RUT en los parámetros.');
        return;
      }

      const datosUsuario = await this.storage.get(rut);
    }
    catch (error) {
      console.error('❌ Error al recuperar datos:', error);
    }
  }
  confirmarPedido() {
    console.log('Pedido confirmado');
    this.navCtrl.navigateForward(['/resumen-pedido-cliente']);
  }

  toHome() {
    this.navCtrl.navigateForward(['/bienvenida']);
  }

  verPedido(rutb:string) {
    this.navCtrl.navigateForward(['/pedido-cliente'], {
      queryParams: { rut: rutb }});
  }

}
