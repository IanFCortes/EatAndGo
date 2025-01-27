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
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create()

    let rutcliente = history.state.rutcliente || await this.storage.get('rutCliente')

    // ✅ Inicializar el formulario ANTES de asignarle valores
    this.mesaCheckForm = this.fb.group({
      mesa: [this.numeroMesa, Validators.required],
      cliente: ['', Validators.required],
      rut: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cantidad: [1, Validators.required],
      fechayhora: ['', Validators.required]
    })

    if (rutcliente) {
      this.clienteService.getCliente(rutcliente).then(cliente => {
        if (cliente) {
          this.cliente = cliente
          this.actualizarFormulario()
        }
      }).catch(error => console.error('Error obteniendo cliente:', error))
    }
  }

  actualizarFormulario() {
    if (!this.mesaCheckForm || !this.cliente) return

    this.mesaCheckForm.patchValue({
      mesa: this.numeroMesa,
      cliente: `${this.cliente.nombre} ${this.cliente.apellido}`,
      rut: this.cliente.rutcliente,
      correo: this.cliente.correo,
      cantidad: this.cliente.cantidad
    })
  }

  async confirmarMesa() {
    if (this.mesaCheckForm.valid && this.cliente) {
      try {
        const reservaData = {
          rutcliente: this.cliente.rutcliente,
          numeroMesa: this.numeroMesa,
          cantidad: this.mesaCheckForm.get('cantidad')?.value, // ✅ Ahora guarda la cantidad de personas
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
