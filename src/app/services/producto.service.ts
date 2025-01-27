import { Injectable } from '@angular/core'
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

export interface Producto {
  id?: string
  nombre: string
  descripcion: string
  precio: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosCollection = collection(this.firestore, 'productos')

  constructor(private firestore: Firestore) {}

  getProductos(): Observable<Producto[]> {
    return collectionData(this.productosCollection, { idField: 'id' }) as Observable<Producto[]>
  }
}
