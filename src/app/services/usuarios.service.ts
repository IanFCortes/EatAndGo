import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private storageInitialized = false;

  // Lista estática de RUTs de administradores
  private adminRuts: string[] = ['11111111-1', '22222222-2', '33333333-3'];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.storageInitialized = true;
  }

  // Obtener usuarios desde Ionic Storage
  async getUsuarios(): Promise<Usuario[]> {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    const usuarios = await this.storage.get('usuarios');
    return usuarios || [];
  }

  // Establecer usuarios en Ionic Storage
  async setUsuarios(usuarios: Usuario[]): Promise<void> {
    if (!this.storageInitialized) {
      await this.initStorage();
    }
    await this.storage.set('usuarios', usuarios);
  }

  // Método para comprobar si el RUT está registrado
  async isRutRegistered(rut: string): Promise<boolean> {
    const usuarios = await this.getUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    return usuario ? true : false;  // Retorna true si el RUT está registrado, false si no
  }

  // Método para comprobar si el RUT es de un administrador
  async esAdmin(rut: string): Promise<boolean> {
    if (!this.storageInitialized) {
      await this.initStorage();
    }

    // Primero revisamos si el RUT está en la lista de administradores
    if (this.adminRuts.includes(rut)) {
      return true;
    }

    // Si no está en la lista estática, revisamos si existe en los usuarios almacenados
    const usuarios = await this.getUsuarios();
    const usuario = usuarios.find(u => u.rut === rut);
    return usuario ? usuario.esAdmin : false;
  }

  // Método para agregar un nuevo usuario al almacenamiento
  async agregarUsuario(nuevoUsuario: Usuario): Promise<void> {
    const usuarios = await this.getUsuarios();
    usuarios.push(nuevoUsuario);
    await this.setUsuarios(usuarios);
  }

  // Otros métodos para interactuar con el almacenamiento (opcional)
  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public get(key: string) {
    return this.storage.get(key);
  }
}
