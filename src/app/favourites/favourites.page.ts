// favourites.page.ts
// This page displays all the movies the user has saved to their favourites list
// Favourites are stored in localStorage so they persist after the app closes
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// https://ionicframework.com/docs/angular/navigation

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons, IonIcon
  ]
})
export class FavouritesPage {

  // array of favourite movies loaded from localStorage
  favourites: any[] = [];

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {
    addIcons({ heart, home });
  }

  // ionViewWillEnter fires every time the page is navigated to
  // this is better than ngOnInit here because ngOnInit only fires once
  // if the user adds a favourite and comes back, we need the list to refresh
  // Ionic lifecycle reference: https://ionicframework.com/docs/angular/lifecycle
  ionViewWillEnter() {
    this.loadFavourites();
  }

  // reads the favourites array from localStorage and parses it back to an array
  // https://www.w3schools.com/jsref/prop_win_localstorage.asp
  loadFavourites() {
    this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  // navigates to the movie details page for the selected favourite
  // https://developer.themoviedb.org/reference/movie-credits
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details',
      movie.id,
      movie.overview || 'No overview available',
      movie.poster_path || 'none',
      movie.title || 'Unknown'
    ]);
  }

  // goes back to the home page
  goToHome() {
    this.router.navigate(['/home']);
  }

  // builds the full image url from the poster path
  // if no image is available, a placeholder image generated using Google Gemini is shown
  // https://developer.themoviedb.org/docs/image-basics
  getImageUrl(posterPath: string): string {
    if (!posterPath || posterPath === 'none') {
      return 'assets/no-image.png';
    }
    return this.movieService.imageBase + posterPath;
  }
}