import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'

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

  constructor(private router: Router, private auth: Auth) {}

  async login() {
    if (!this.email || !this.clave) {
      this.errorMessage = 'Por favor, completa todos los campos'
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.clave)
      console.log('Usuario autenticado:', userCredential.user.uid)
      
      this.router.navigate(['/menu'])
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error)
      this.errorMessage = 'Correo o contraseña incorrectos'
    }
  }

  toIdentificacion() {
    this.router.navigate(['/identificacion'])
  }
}
