import { Injectable } from '@angular/core'
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { Timestamp } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservasCollection = collection(this.firestore, 'reservas')

  constructor(private firestore: Firestore) {}

  async addReserva(rutcliente: string, numeroMesa: number, cantidad: number, fechayhora: Timestamp): Promise<void> {
    try {
      await addDoc(this.reservasCollection, {
        rutcliente,
        numeroMesa,
        cantidad,
        fechayhora
      })
      console.log('Reserva guardada exitosamente')
    } catch (error) {
      console.error('Error al guardar la reserva:', error)
      throw error
    }
  }
}
