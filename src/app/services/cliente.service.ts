import { Injectable } from '@angular/core'
import { Firestore, collection, doc, setDoc, getDoc } from '@angular/fire/firestore'
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Cliente } from '../models/cliente.models'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesCollection = collection(this.firestore, 'clientes')

  constructor(private firestore: Firestore, private auth: Auth) {}

  // ✅ Registrar cliente en Firebase Authentication y Firestore
  async registerCliente(cliente: Cliente, clave: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, cliente.correo, clave)
      const uid = userCredential.user.uid // 🔹 Obtener el UID del usuario autenticado

      // ✅ Guardar en Firestore con UID como clave única
      const clienteRef = doc(this.clientesCollection, uid)
      await setDoc(clienteRef, {
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
        rutcliente: cliente.rutcliente
      })
    } catch (error) {
      console.error('Error al registrar cliente:', error)
      throw error
    }
  }

  // ✅ Obtener cliente desde Firestore por UID
  async getCliente(uid: string): Promise<Cliente | null> {
    const clienteRef = doc(this.clientesCollection, uid)
    const clienteSnap = await getDoc(clienteRef)
    return clienteSnap.exists() ? (clienteSnap.data() as Cliente) : null
  }

  // ✅ Iniciar sesión con email y clave
  async loginCliente(correo: string, clave: string): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, correo, clave)
      return userCredential.user.uid // 🔹 Devolver el UID del usuario autenticado
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  }
}
