import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MenuPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  confirmarPedido () {
    console.log('Pedido confirmado');
    this.router.navigate(['/resumen-pedido-cliente']);
  }

  paginaAnterior() {
    this.router.navigate(['/..']);
  }

  verPedido() {
    this.router.navigate(['/pedido-cliente']);
  }

}
