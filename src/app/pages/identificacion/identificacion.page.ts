import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ClienteService } from '../../services/cliente.service'
import { Cliente } from '../../models/cliente.models'
import { Timestamp } from 'firebase/firestore'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { Storage } from '@ionic/storage-angular'

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.page.html',
  styleUrls: ['./identificacion.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class IdentificacionPage implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    rutcliente: '',
    correo: '',
    cantidad: 1, // ✅ Asegurar que cantidad está definido
    fechayhora: Timestamp.now()
  }

  constructor(private router: Router, private clienteService: ClienteService, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create()
  }

  // ✅ Agregar las funciones que faltaban
  increment() {
    this.cliente.cantidad++
  }

  decrement() {
    if (this.cliente.cantidad > 1) {
      this.cliente.cantidad--
    }
  }

  async onSubmit() {
    if (this.cliente.nombre && this.cliente.apellido && this.cliente.correo) {
      try {
        await this.clienteService.addCliente(this.cliente)
  
        await this.storage.set('clienteData', this.cliente)
  
        this.router.navigate(['/mesa-check'], { state: { rutcliente: this.cliente.rutcliente } })
      } catch (error) {
        console.error('Error al guardar cliente:', error)
      }
    } else {
      console.error('Por favor completa todos los campos')
    }
  }

  toHome() {
    this.router.navigate(['/bienvenida'])
  }
}
