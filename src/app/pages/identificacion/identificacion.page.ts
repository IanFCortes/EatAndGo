import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.page.html',
  styleUrls: ['./identificacion.page.scss'],
  standalone: true,
  imports: [FormsModule, IonicModule]
})
export class IdentificacionPage implements OnInit {

  cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    fechayhora: '',
  }

  ngOnInit() {
  }

  



  cantidad: number = 1; // Valor inicial

  increment() {
    this.cantidad++;
  }
  
  decrement() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  constructor(private router: Router) {}

  
  onSubmit() {
    if (this.cliente.nombre && this.cliente.apellido && this.cliente.correo && this.cliente.fechayhora) {
      // Lógica adicional antes de la redirección
      this.router.navigate(['/mesa-check']); // Cambia '/ruta-destino' por tu ruta deseada
    }
  }


}
