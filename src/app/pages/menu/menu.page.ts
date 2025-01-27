import { Component, OnInit } from '@angular/core'
import { IonicModule, ToastController } from '@ionic/angular'
import { Router } from '@angular/router'
import { getAuth, signOut, onAuthStateChanged } from '@angular/fire/auth'
import { ProductoService, Producto } from '../../services/producto.service'
import { Storage } from '@ionic/storage-angular'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MenuPage implements OnInit {
  user: any = null
  productos: Producto[] = []

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private storage: Storage,
    private toastController: ToastController 
  ) {}

  async ngOnInit() {
    await this.storage.create()
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.router.navigate(['/bienvenida'])
      } else {
        this.user = user
      }
    })

    // ✅ Obtener productos desde Firestore
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data.map(producto => {
        if (!producto.id) {
          console.error('⚠️ Producto sin ID detectado:', producto)
          return { ...producto, id: Math.random().toString(36).substr(2, 9) }
        }
        return producto
      })
      console.log('✅ Productos cargados:', this.productos)
    })
  }

  async agregarAlCarrito(producto: Producto) {
    if (!producto || !producto.id) {
      console.error('❌ El producto es inválido o no tiene un ID:', producto)
      return
    }

    let carrito: { producto: Producto; cantidad: number }[] = await this.storage.get('carrito') || []
    let index = carrito.findIndex(item => item.producto?.id === producto.id)
    if (index !== -1) {
      carrito[index].cantidad++
    } else {
      carrito.push({ producto, cantidad: 1 })
    }

    await this.storage.set('carrito', carrito)
    console.log('✅ Producto agregado al carrito:', producto)

    this.mostrarToast(`${producto.nombre} agregado al carrito`)
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'success',
      position: 'top'
    })
    await toast.present()
  }

  verPedido() {
    this.router.navigate(['/pedido-cliente'])
  }

  verHistorial() {
    this.router.navigate(['/historial-pedidos-cliente'])
  }

  logout() {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada exitosamente')
        this.router.navigate(['/bienvenida'])
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error)
      })
  }
}
