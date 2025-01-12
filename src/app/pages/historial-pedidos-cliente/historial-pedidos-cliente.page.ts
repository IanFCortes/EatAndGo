import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-historial-pedidos-cliente',
  templateUrl: './historial-pedidos-cliente.page.html',
  styleUrls: ['./historial-pedidos-cliente.page.scss'],
  standalone: false
})
export class HistorialPedidosClientePage implements OnInit {

  historialPedidos = [
    { id: '001', fecha: new Date(2024, 11, 1), total: 15000 },
    { id: '002', fecha: new Date(2024, 11, 5), total: 30000 },
    { id: '003', fecha: new Date(2024, 11, 8), total: 25000 },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
  }

  verDetalles() {
    this.router.navigate(['/resumen-cliente']);
  }

  irMenu() {
    this.router.navigate(['/menu']);
  }



}
