import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service'; // Asegúrate de importar el servicio

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
  adminRuts: string[] = ['11111111-1', '22222222-2', '33333333-3'];  // Lista estática de administradores

  constructor(private navCtrl: NavController, private usuariosService: UsuariosService) { }

  ngOnInit() {
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

  // Método para comprobar si el RUT es de un administrador
  async comprobarAdmin() {
    const formattedRut = this.formatRut(this.rut);  // Formateamos el RUT antes de procesarlo
    this.rut = formattedRut;  // Asignamos el RUT formateado a la variable

    if (formattedRut.length === 10) {
      // Primero, comprobamos si el RUT está registrado
      this.rutRegistrado = await this.usuariosService.isRutRegistered(formattedRut);

      if (this.rutRegistrado) {
        console.log('El RUT ya está registrado.');
      } else {
        console.log('El RUT NO está registrado.');
      }

      // Luego, verificamos si el RUT es de un administrador
      this.isAdmin = await this.usuariosService.esAdmin(formattedRut); // Verificación de admin desde el servicio

      if (this.isAdmin) {
        console.log('El RUT es de un administrador.');
      } else {
        console.log('El RUT NO es de un administrador.');
      }
    } else {
      console.log('El RUT debe tener 10 caracteres.');
      this.isAdmin = false; // Aseguramos que el botón se deshabilite si el RUT no es válido
      this.rutRegistrado = false; // Aseguramos que el botón de "Registrarse" esté habilitado
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
