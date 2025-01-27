import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ClienteService } from '../../services/cliente.service'
import { ReservaService } from '../../services/reserva.service'
import { Cliente } from '../../models/cliente.models'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Storage } from '@ionic/storage-angular'
import { CommonModule } from '@angular/common'
import { Timestamp } from 'firebase/firestore'
import { Auth, onAuthStateChanged } from '@angular/fire/auth' 

@Component({
  selector: 'app-mesa-check',
  templateUrl: './mesa-check.page.html',
  styleUrls: ['./mesa-check.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule]
})
export class MesaCheckPage implements OnInit {
  mesaCheckForm!: FormGroup
  cliente: Cliente | null = null
  numeroMesa: number = Math.floor(Math.random() * 20) + 1

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private reservaService: ReservaService,
    private storage: Storage,
    private auth: Auth
  ) {}

  async ngOnInit() {
    await this.storage.create()

    
    this.mesaCheckForm = this.fb.group({
      mesa: [this.numeroMesa, Validators.required],
      cliente: ['', Validators.required],
      rut: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechayhora: ['', Validators.required]
    })

    
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('Usuario autenticado:', user.uid)
        const clienteData = await this.clienteService.getCliente(user.uid)
        if (clienteData) {
          console.log('Cliente encontrado:', clienteData)
          this.cliente = clienteData
          this.actualizarFormulario()
        } else {
          console.error('No se encontró el cliente en Firestore.')
        }
      } else {
        console.error('No hay usuario autenticado.')
        this.router.navigate(['/identificacion'])
      }
    })
  }

  actualizarFormulario() {
    if (!this.mesaCheckForm || !this.cliente) {
      console.error('No se pudo actualizar el formulario porque los datos del cliente son nulos.')
      return
    }

    console.log('Actualizando formulario con:', this.cliente)

    this.mesaCheckForm.patchValue({
      mesa: this.numeroMesa,
      cliente: `${this.cliente.nombre} ${this.cliente.apellido}`,
      rut: this.cliente.rutcliente
    })
  }

  async confirmarMesa() {
    if (this.mesaCheckForm.valid && this.cliente) {
      try {
        const reservaData = {
          rutcliente: this.cliente.rutcliente,
          numeroMesa: this.numeroMesa,
          cantidad: this.mesaCheckForm.get('cantidad')?.value,
          fechayhora: Timestamp.fromDate(new Date(this.mesaCheckForm.get('fechayhora')?.value))
        }

        await this.reservaService.addReserva(
          reservaData.rutcliente,
          reservaData.numeroMesa,
          reservaData.cantidad,
          reservaData.fechayhora
        )

        console.log('Reserva guardada correctamente:', reservaData)
        this.router.navigate(['/menu'])
      } catch (error) {
        console.error('Error al guardar la reserva:', error)
      }
    } else {
      console.log('Por favor completa todos los campos correctamente.')
    }
  }

  paginaAnterior() {
    this.router.navigate(['/identificacion'])
  }
}
