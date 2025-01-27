import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ClienteService } from '../../services/cliente.service'
import { Cliente } from '../../models/cliente.models'
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
    correo: ''
  }

  clave: string = '' 

  constructor(private router: Router, private clienteService: ClienteService, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create()
  }

  async onSubmit() {
    if (this.cliente.nombre && this.cliente.apellido && this.cliente.correo && this.clave) {
      try {
       
        await this.clienteService.registerCliente(this.cliente, this.clave)

       
        await this.storage.set('clienteData', this.cliente)

      
        this.router.navigate(['/mesa-check'])
      } catch (error) {
        console.error('Error al registrar cliente:', error)
      }
    } else {
      console.error('Por favor completa todos los campos')
    }
  }

  toHome() {
    this.router.navigate(['/bienvenida'])
  }
}
