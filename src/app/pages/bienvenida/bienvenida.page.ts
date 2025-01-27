import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Firestore, doc, getDoc } from '@angular/fire/firestore'

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false
})
export class BienvenidaPage {
  email: string = ''
  clave: string = ''
  errorMessage: string = ''

  constructor(private router: Router, private auth: Auth, private firestore: Firestore) {}

  async login() {
    if (!this.email || !this.clave) {
      this.errorMessage = 'Por favor, completa todos los campos'
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.clave)
      console.log('Usuario autenticado:', userCredential.user.uid)

      // ✅ Obtener el rutcliente desde Firestore
      const clienteRef = doc(this.firestore, `clientes/${userCredential.user.uid}`)
      const clienteSnap = await getDoc(clienteRef)

      if (!clienteSnap.exists()) {
        console.error('❌ No se encontró el cliente en Firestore')
        return
      }

      const rutcliente = clienteSnap.data()['rutcliente']
      console.log('🔹 Rut Cliente:', rutcliente)

      // ✅ Redirigir a `mesa-check` con el rut
      this.router.navigate([`/mesa-check`], { queryParams: { rut: rutcliente } })
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error)
      this.errorMessage = 'Correo o contraseña incorrectos'
    }
  }

  toIdentificacion() {
    this.router.navigate(['/identificacion'])
  }
}
