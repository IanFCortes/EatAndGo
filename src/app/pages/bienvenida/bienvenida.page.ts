import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: false
})
export class BienvenidaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toMenu() {
    this.router.navigate(['/menu'])
  }

  toIdentificacion() {
    this.router.navigate(['/identificacion'])
  }
  
  toAdmin() {
    this.router.navigate(['/administrador'])
  }
}
