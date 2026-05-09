// main.ts
// Entry point of the app - Angular needs this file to get the app started
// Added provideHttpClient so HTTP requests are available everywhere in the app, used for the TMDB API calls
// https://angular.dev/api/common/http/provideHttpClient
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // this line is what allows HttpClient to work throughout the whole app
    provideHttpClient(),
  ],
});