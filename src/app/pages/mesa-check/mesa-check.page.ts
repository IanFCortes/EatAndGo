import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mesa-check',
  templateUrl: './mesa-check.page.html',
  styleUrls: ['./mesa-check.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, IonicStorageModule, FormsModule],
})
export class MesaCheckPage implements OnInit {
  private _storage: Storage | null = null;
  usuarios: Usuario[] = [];
  numeroMesa: number = 1;
  mesaCheckForm!: FormGroup;
  nombreOcupante: string = ''; 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    
    if (!this._storage) {
      this._storage = await this.storage.create();
    }

    try {
      const usuariosGuardados = await this._storage?.get('usuarios');
      if (Array.isArray(usuariosGuardados)) {
        this.usuarios = usuariosGuardados;
      } else {
        this.usuarios = this.usuarioService.obtenerUsuarios();
        await this._storage?.set('usuarios', this.usuarios);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }

    // Configuración del formulario
    this.mesaCheckForm = this.fb.group({
      mesa: [this.numeroMesa, Validators.required],
      cliente: ['', Validators.required],
    });
  }

  async guardarUsuarios(nuevosUsuarios: Usuario[]) {
    try {
      if (!this._storage) {
        this._storage = await this.storage.create();
      }
  

      this.usuarios = this.eliminarDuplicados(nuevosUsuarios); // Asegúrate de que los nuevos usuarios sean únicos
      await this._storage?.set('usuarios', this.usuarios);
  
      console.log('Usuarios guardados:', this.usuarios); // Verificar que los datos se guardan correctamente
    } catch (error) {
      console.error("Error al guardar usuarios:", error);
    }
  }
  
  eliminarDuplicados(lista: Usuario[]): Usuario[] {
    const usuariosUnicos = new Map<string, Usuario>();
    lista.forEach((usuario) => {
      usuariosUnicos.set(usuario.rut, usuario); // Usa 'rut' como clave única
    });
    return Array.from(usuariosUnicos.values());
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
