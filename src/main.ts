// main.ts
// This is the entry point of the app, it bootstraps the root component
// provideHttpClient is needed so we can make HTTP requests to the TMDB API
// https://angular.dev/guide/http/making-requests
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