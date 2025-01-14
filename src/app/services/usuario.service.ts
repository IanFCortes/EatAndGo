import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [];

  constructor() {}

  // Guardar un usuario en el arreglo
  guardarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  // Obtener todos los usuarios
  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }
}
