import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosCollection = collection(this.firestore, 'productos')

  constructor(private firestore: Firestore) { }

  getProducto(): Observable<Producto[]> {
    return collectionData(this.productosCollection, { idField: 'id' }) as Observable<Producto[]>;
  }


  async addProducto(id: string,
    nombre: string,
    precio: number,
    descripcion: string): Promise<void> {
    try {
      await addDoc(this.productosCollection, {
        id,
        nombre,
        precio,
        descripcion
      })
      console.log('Producto guardado exitosamente')
    } catch (error) {
      console.error('Error al guardar el producto:', error)
      throw error
    }
  }

  
}
