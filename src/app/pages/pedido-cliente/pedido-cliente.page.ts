import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
  standalone: false
})
export class PedidoClientePage implements OnInit {

  usuario: any = null;
  productos: any[] = [];
  totalPedido: number = 0;
  numeromesa: number = 1;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private storage: Storage,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.storage.create(); // 💡 IMPORTANTE: Inicializa Storage

    try {
      const rut = this.route.snapshot.queryParamMap.get('rut');
      console.log('🔹 RUT recibido:', rut);


      const usuario = await this.storage.get('usuario');


      if (usuario) {
        this.usuario = usuario;
        console.log('Usuario recuperado:', this.usuario);
      } else {
        console.error('No se encontraron datos de usuario en el almacenamiento');
      }

      
      if (!rut) {
        console.error('❌ No se encontró el RUT en los parámetros.');
        return;
      }

      const datosUsuario = await this.storage.get(rut);

      if (!datosUsuario) {
        console.error('❌ No se encontraron datos en el Storage.');
        return;
      }

      if (!this.usuario) {
        console.error('❌ Los datos del usuario no están disponibles.');
        return;
      }

      console.log('✅ Usuario encontrado en Storage:', datosUsuario);
      this.usuario = datosUsuario;

      // ✅ Recupera el número de mesa dinámicamente si está almacenado
      this.usuario.numeromesa = this.usuario.numeromesa || 1;
      // ✅ Formatea la fecha solo si existe y es válida
      if (this.usuario.fechayhora) {
        const fecha = new Date(this.usuario.fechayhora);
        this.usuario.fechayhora = isNaN(fecha.getTime()) ? 'No disponible' : fecha.toLocaleString();
      }

    } catch (error) {
      console.error('❌ Error al recuperar datos:', error);
    }
  }

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
