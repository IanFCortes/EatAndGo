import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
  standalone: false
})
export class AdministradorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  paginaAnterior() {
    this.router.navigate(['/bienvenida']);
  }

}
