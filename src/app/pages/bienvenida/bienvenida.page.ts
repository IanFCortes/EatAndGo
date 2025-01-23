import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service'; // Asegúrate de importar el servicio
import { Storage } from '@ionic/storage-angular'; // Importar Ionic Storage

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false
})
export class BienvenidaPage implements OnInit {

  isAdmin: boolean | null = null;  // Variable para comprobar si el RUT es de administrador
  rut: string = '';  // RUT ingresado por el usuario
  rutRegistrado: boolean = false;  // Variable para saber si el RUT está registrado
  isRutValid: boolean = false;  // Nueva variable para habilitar el botón "Login"
  isRutRegistered: boolean = false;  // Variable para deshabilitar el botón "Registrate" si el RUT ya está registrado
  adminRuts: string[] = ['11111111-1', '22222222-2', '33333333-3'];  // Lista estática de administradores
  storage: Storage;

  constructor(private navCtrl: NavController, 
              private usuariosService: UsuariosService, 
              private _storage: Storage) {
    this.storage = _storage;
  }

  ngOnInit() {
    this.storage.create();  // Inicializa el almacenamiento de Ionic
  }

  // Método para formatear el RUT (con guion)
  formatRut(rut: string): string {
    rut = rut.replace(/[^0-9kK]/g, '');  // Eliminar cualquier caracter que no sea número ni 'k'

    if (rut.length <= 8) {
      return rut;  // Si el RUT es menor o igual a 8 caracteres, solo lo devolvemos limpio
    }

    const rutBody = rut.slice(0, -1);  // Los primeros 8 caracteres
    const rutDv = rut.slice(-1).toUpperCase();  // El último carácter (dígito verificador)

    return `${rutBody}-${rutDv}`;  // Retornamos el RUT con el guion
  }

  // Método para comprobar si el RUT está registrado en Ionic Storage
  async comprobarAdmin() {
    const formattedRut = this.formatRut(this.rut);  // Formateamos el RUT antes de procesarlo
    this.rut = formattedRut;  // Asignamos el RUT formateado a la variable

    if (formattedRut.length === 10) {
      // Verificar si el RUT existe en el almacenamiento
      const datosUsuario = await this.storage.get(formattedRut);

      if (datosUsuario) {
        // Si el RUT está registrado en Ionic Storage
        console.log('El RUT ya está registrado en Storage.');

        // Actualizamos las variables isRutValid y isRutRegistered
        this.isRutValid = true;
        this.isRutRegistered = true;  // Deshabilitar el botón "Registrate"

        // Comprobamos si es administrador
        this.isAdmin = this.adminRuts.includes(formattedRut);
        console.log(this.isAdmin ? 'Es un administrador.' : 'No es un administrador.');
      } else {
        // Si el RUT no está registrado en Ionic Storage
        console.log('El RUT NO está registrado en Storage.');
        this.isRutValid = false;  // Deshabilitar el botón de "Login"
        this.isRutRegistered = false;  // Habilitar el botón "Registrate"
        this.isAdmin = false;
      }
    } else {
      console.log('El RUT debe tener 10 caracteres.');
      this.isAdmin = false; // Aseguramos que el botón se deshabilite si el RUT no es válido
      this.isRutValid = false;  // Deshabilitar el botón de "Login"
      this.isRutRegistered = false;  // Habilitar el botón "Registrate"
    }
  }

  // Método para navegar al menú
  toMenu() {
    this.navCtrl.navigateForward(['/menu']);
  }

  // Método para navegar a la página de identificación
  toIdentificacion() {
    this.navCtrl.navigateForward(['/identificacion']);
  }

  // Método para navegar al menú de administración (si es admin)
  toAdmin() {
    this.navCtrl.navigateForward(['/administrador']);
  }

}
