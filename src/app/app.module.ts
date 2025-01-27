import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

// Lista de proveedores de Firebase
const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(environment.firebase)), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore()), 
  provideAnalytics(() => getAnalytics()), 
  provideStorage(() => getStorage()) 
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(), 
  ],
  providers: [
    ...firebaseProviders, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
