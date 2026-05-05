// app.routes.ts
// This file sets up all the navigation routes for the app
// Each route maps a URL to a specific page component
// Really helpful for understanding routing: https://angular.dev/guide/routing
// Ionic navigation docs: https://ionicframework.com/docs/angular/navigation

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // default route, redirects to home when the app first opens
    // https://www.w3schools.com/angular/angular_routing.asp
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // home page showing trending movies and search
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    // movie details page showing cast and crew for a selected movie
    // the colon means these are dynamic parameters passed through the url
    // learned about route parameters here: https://angular.dev/guide/routing/router-tutorial
    path: 'movie-details/:id/:overview/:poster',
    loadComponent: () => import('./movie-details/movie-details.page').then(m => m.MovieDetailsPage)
  },
  {
    // details page for an individual cast or crew member
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then(m => m.DetailsPage)
  },
  {
    // favourites page showing all movies the user has saved
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then(m => m.FavouritesPage)
  }
];