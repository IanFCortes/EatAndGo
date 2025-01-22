import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-resumen-cliente',
  templateUrl: './resumen-cliente.page.html',
  styleUrls: ['./resumen-cliente.page.scss'],
  standalone: false
})
export class ResumenClientePage implements OnInit {

  constructor(
    private navCtrl: NavController // Inyectamos AlertController aquí
  ) {}

  ngOnInit() {}

  volver() {
    this.navCtrl.back(); // Navegar a la página anterior
  }
}
