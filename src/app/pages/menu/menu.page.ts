import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
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

  constructor(private router: Router, private productoService: ProductoService, private storage: Storage) {}

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

    this.productoService.getProductos().subscribe((data) => {
      this.productos = data
      console.log('Productos cargados:', this.productos)
    })
  }

  async agregarAlCarrito(producto: Producto) {
    let carrito: Producto[] = await this.storage.get('carrito') || []
    carrito.push(producto)
    await this.storage.set('carrito', carrito)
    console.log('Producto agregado al carrito:', producto)
  }

  verPedido() {
    this.router.navigate(['/pedido-cliente'])
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
