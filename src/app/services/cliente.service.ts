import { Injectable } from '@angular/core'
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore'
import { Cliente } from '../models/cliente.models'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesCollection = collection(this.firestore, 'clientes')

  constructor(private firestore: Firestore) {}

  async addCliente(cliente: Cliente): Promise<void> {
    const clienteRef = doc(this.clientesCollection, cliente.rutcliente)
    await setDoc(clienteRef, {
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo
    }, { merge: true }) 
  }


  async getCliente(rutcliente: string): Promise<Cliente | null> {
    const clienteRef = doc(this.clientesCollection, rutcliente)
    const clienteSnap = await getDoc(clienteRef)
    return clienteSnap.exists() ? (clienteSnap.data() as Cliente) : null
  }
}
