// home.page.ts
// This is the main page of the app, first thing the user sees when they open it
// Shows todays trending movies by default and lets the user search for movies
// Useful for understanding how pages work in Ionic: https://ionicframework.com/docs/angular/your-first-app
// https://angular.dev/guide/forms

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonIcon, IonSearchbar,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';
// FormsModule is needed for two way data binding with ngModel on the search bar
// https://angular.dev/guide/forms
// CommonModule gives us ngIf and ngFor for the template
// https://angular.dev/guide/directives

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
 imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons, IonIcon, IonSearchbar,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle
  ]
})
export class HomePage implements OnInit {

  // holds whatever the user types into the search box
  searchQuery: string = '';

  // array of movies to display, gets updated when trending or search results come in
  movies: any[] = [];

  // heading text changes depending on whether we are showing trending or search results
  heading: string = "Today's Trending Movies";

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    // registering the icons used in the toolbar
    // https://ionic.io/ionicons
    addIcons({ heart, home });
  }

  // ngOnInit runs when the page first loads, so we load trending movies straight away
  // https://angular.dev/guide/components/lifecycle
  ngOnInit() {
    this.loadTrending();
  }

  // calls the movie service to get todays trending movies
  // subscribe is how we get the data back from an Observable
  // https://rxjs.dev/guide/observable
  loadTrending() {
    this.movieService.getTrending().subscribe((data: any) => {
      this.movies = data.results;
      this.heading = "Today's Trending Movies";
    });
  }

  // called when the user clicks search
  // if nothing is typed it just shows trending movies instead
  // https://developer.themoviedb.org/docs
  search() {
    if (this.searchQuery.trim() === '') {
      this.loadTrending();
    } else {
      this.movieService.searchMovies(this.searchQuery).subscribe((data: any) => {
        this.movies = data.results;
        this.heading = this.searchQuery + ' Movies';
      });
    }
  }

  // navigates to the movie details page when a movie is clicked
  // passing the movie id, overview and poster through the url as parameters
  // https://angular.dev/guide/routing
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details',
      movie.id,
      movie.overview || 'No overview available',
      movie.poster_path || 'none'
    ]);
  }

  // takes the user to the favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  // builds the full image url from just the poster path TMDB gives us
  // TMDB only returns the path so we need to add the base url ourselves
  // https://developer.themoviedb.org/docs/image-basics
  getImageUrl(posterPath: string): string {
    if (!posterPath || posterPath === 'none') {
      return 'assets/no-image.png';
    }
    return this.movieService.imageBase + posterPath;
  }
}