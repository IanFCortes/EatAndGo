import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mesa-check',
  templateUrl: './mesa-check.page.html',
  styleUrls: ['./mesa-check.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MesaCheckPage implements OnInit {

  numeroMesa: number = 1;

  usuario: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    rut: '',
    cantidadpersonas: 0,
    numeromesa: 0,
  }
  constructor(
    private router: Router, private servicio: UsuariosService
  ) { }

   async ngOnInit() {
    const user = await this.servicio.get('usuario');
    console.log('Usuario:', user);
  }


  confirmarMesa() {
    this.router.navigate(['/menu']);
  }

  paginaAnterior() {
    this.router.navigate(['/..']);
  }

  onSubmit() {
    
  }
}