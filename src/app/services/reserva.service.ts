import { Injectable } from '@angular/core'
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { Timestamp } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservasCollection = collection(this.firestore, 'reservas')

  constructor(private firestore: Firestore) {}

  // ✅ Guardar una nueva reserva con `cantidad`
  async addReserva(rutcliente: string, numeroMesa: number, cantidad: number, fechayhora: Timestamp): Promise<void> {
    await addDoc(this.reservasCollection, {
      rutcliente,
      numeroMesa,
      cantidad, // ✅ Se guarda la cantidad de personas
      fechayhora
    })
  }
}
