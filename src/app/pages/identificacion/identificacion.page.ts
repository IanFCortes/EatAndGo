import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonText, IonToolbar, IonTitle, IonButton, IonContent, IonItem, IonLabel} from '@ionic/angular/standalone';


@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.page.html',
  styleUrls: ['./identificacion.page.scss'],
  standalone: true,
  imports: [FormsModule, IonText, IonToolbar, IonTitle, IonButton, IonContent, IonItem, IonLabel, IonHeader]
})
export class IdentificacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
