import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Producto } from '../../services/producto.service'
import { getAuth, signOut } from '@angular/fire/auth'

@Component({
  selector: 'app-resumen-pedido-cliente',
  templateUrl: './resumen-pedido-cliente.page.html',
  styleUrls: ['./resumen-pedido-cliente.page.scss'],
  standalone: false
})
export class ResumenPedidoClientePage implements OnInit {
  compra: { productos: { producto: Producto; cantidad: number }[]; total: number } | null = null

  constructor(private router: Router) {}

  ngOnInit() {
    if (history.state && history.state.compra) {
      this.compra = history.state.compra
    }
  }

  volverMenu() {
    this.router.navigate(['/menu'])
  }

  verHistorial() {
    this.router.navigate(['/historial-pedidos-cliente'])
  }

  logout() {
    const auth = getAuth()
    signOut(auth).then(() => {
      this.router.navigate(['/bienvenida'])
    }).catch((error) => {
      console.error('Error al cerrar sesión', error)
    })
  }
}
