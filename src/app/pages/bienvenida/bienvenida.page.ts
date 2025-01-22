import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false
})
export class BienvenidaPage implements OnInit {

  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  toMenu() {
    this.navCtrl.navigateForward(['/menu']);
  }

  toIdentificacion() {
    this.navCtrl.navigateForward(['/identificacion']);
  }
  
  toAdmin() {
    this.navCtrl.navigateForward(['/administrador']);
  }

  comprobarUser () {
    
  }

  
}
