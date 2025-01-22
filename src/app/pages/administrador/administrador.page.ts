import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AdministradorPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  valorsegmento: string = 'usuarios';

  segmentChanged(event: any) {
    this.valorsegmento = event.detail.value;
  }

  paginaAnterior() {
    this.navCtrl.back();
  }

}
