import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/producto.service';
import { CommonModule } from '@angular/common';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MenuPage implements OnInit {
  categorias: any[] = []; // Lista de categorías con productos

  productos: Producto | null = null;

  constructor(private router: Router, private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.getProducto().subscribe(data => {
      this.productos = {id: '', nombre: '', precio: 0, descripcion:''};
    });
  }

  agregarAlPedido(producto: any) {
    console.log('Producto agregado al pedido:', producto);
    // Implementar lógica para añadir al pedido
  }

  verPedido() {
    this.router.navigate(['/pedido-cliente']);
  }
}
