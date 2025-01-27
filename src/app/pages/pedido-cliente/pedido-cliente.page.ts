import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { Storage } from '@ionic/storage-angular'
import { Producto } from '../../services/producto.service'
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { Auth } from '@angular/fire/auth'

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
  standalone: false
})
export class PedidoClientePage implements OnInit {
  carrito: { producto: Producto; cantidad: number }[] = []
  totalPedido: number = 0
  private comprasCollection = collection(this.firestore, 'compras')

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: Storage,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  async ngOnInit() {
    await this.storage.create()
    this.cargarCarrito()
  }

  async cargarCarrito() {
    this.carrito = await this.storage.get('carrito') || []
    this.calcularTotal()
  }

  calcularTotal() {
    this.totalPedido = this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0)
  }

  async eliminarProducto(index: number) {
    this.carrito.splice(index, 1)
    await this.storage.set('carrito', this.carrito)
    this.calcularTotal()
  }

  async confirmarPedido() {
    if (this.carrito.length === 0) {
      const alert = await this.alertController.create({
        header: 'Carrito Vacío',
        message: 'No tienes productos en tu pedido.',
        buttons: ['OK']
      })
      await alert.present()
      return
    }

    const user = this.auth.currentUser
    if (!user) {
      console.error('❌ No hay usuario autenticado')
      return
    }

    // 📌 Guardar en Firestore
    const compraData = {
      rutcliente: user.uid,
      productos: this.carrito,
      total: this.totalPedido
    }

    try {
      await addDoc(this.comprasCollection, compraData)
      console.log('✅ Compra guardada en Firestore:', compraData)

      await this.storage.remove('carrito') // 🔹 Vaciar carrito después de compra

      this.router.navigate(['/resumen-pedido-cliente'], { state: { compra: compraData } })
    } catch (error) {
      console.error('❌ Error al guardar la compra:', error)
    }
  }

  volverMenu() {
    this.router.navigate(['/menu'])
  }
}
