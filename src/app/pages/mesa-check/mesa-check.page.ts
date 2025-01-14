import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mesa-check',
  templateUrl: './mesa-check.page.html',
  styleUrls: ['./mesa-check.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,IonicModule]
})
export class MesaCheckPage implements OnInit {

  numeroMesa: number = 1;
  mesaCheckForm: any;
  

  

  constructor(private router: Router,private fb: FormBuilder,private usuarioService: UsuarioService) {}

  
  usuarios: Usuario[] = [];
  
  ngOnInit() {
    this.mesaCheckForm = this.fb.group({
      mesa: ['', Validators.required], // Campo para el número de mesa
      cliente: ['', Validators.required], // Campo para el nombre del cliente
    });
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  confirmarMesa() {
    this.router.navigate(['/menu']);
  }

  paginaAnterior() {
    this.router.navigate(['/..']);
  }

  onSubmit() {
    if (this.mesaCheckForm.valid) {
      console.log('Formulario válido:', this.mesaCheckForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
