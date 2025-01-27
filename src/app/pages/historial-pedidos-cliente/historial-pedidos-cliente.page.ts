import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Firestore, collection, query, where, getDocs, doc, getDoc } from '@angular/fire/firestore'
import { Auth } from '@angular/fire/auth'

interface ProductoCompra {
  producto: {
    nombre: string
    descripcion: string
    precio: number
  }
  cantidad: number
}

interface Compra {
  id: string
  productos: ProductoCompra[]
  total: number
  reservaId: string
  fechayhora?: Date
  verDetalles: boolean
}

@Component({
  selector: 'app-historial-pedidos-cliente',
  templateUrl: './historial-pedidos-cliente.page.html',
  styleUrls: ['./historial-pedidos-cliente.page.scss'],
  standalone: false
})
export class HistorialPedidosClientePage implements OnInit {
  compras: Compra[] = []
  nombreUsuario: string = ''

  constructor(private router: Router, private firestore: Firestore, private auth: Auth) {}

  async ngOnInit() {
    const user = this.auth.currentUser
    if (!user) {
      console.error('❌ No hay usuario autenticado')
      this.router.navigate(['/bienvenida'])
      return
    }

    this.nombreUsuario = user.displayName || user.email || 'Usuario'

    const comprasCollection = collection(this.firestore, 'compras')
    const q = query(comprasCollection, where('rutcliente', '==', user.uid))

    try {
      const querySnapshot = await getDocs(q)
      this.compras = querySnapshot.docs.map(doc => ({
        id: doc.id,
        productos: doc.data()['productos'] || [],
        total: doc.data()['total'] || 0,
        reservaId: doc.data()['reservaId'] || '',
        fechayhora: undefined,
        verDetalles: false
      })) as Compra[]

      for (let compra of this.compras) {
        if (compra.reservaId) {
          const reservaRef = doc(this.firestore, `reservas/${compra.reservaId}`)
          const reservaSnap = await getDoc(reservaRef)
          if (reservaSnap.exists()) {
            compra.fechayhora = reservaSnap.data()['fechayhora']?.toDate() || new Date()
          }
        }
      }

      console.log('✅ Historial de compras cargado:', this.compras)
    } catch (error) {
      console.error('❌ Error al obtener el historial de compras:', error)
    }
  }

  toggleDetalles(compra: Compra) {
    compra.verDetalles = !compra.verDetalles
  }

  volverMenu() {
    this.router.navigate(['/menu'])
  }
}
