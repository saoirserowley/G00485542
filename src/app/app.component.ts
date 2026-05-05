// app.component.ts
// This is the root component of the app, the shell that holds the whole app together
// Every page gets displayed inside the ion-router-outlet below
// Resource used: https://angular.dev/guide/components
// Ionic app setup: https://ionicframework.com/docs/angular/your-first-app

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
// IonApp and IonRouterOutlet are Ionic components
// IonRouterOutlet is where each page gets rendered when you navigate
// https://ionicframework.com/docs/api/router-outlet

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  // standalone components declare their own imports directly
  // learned about this here: https://angular.dev/guide/components
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}