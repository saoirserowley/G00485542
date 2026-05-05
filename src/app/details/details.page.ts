// details.page.ts
// This page shows information about a cast or crew member
// including their bio, date of birth, and other movies they have appeared in
// https://ionicframework.com/docs/angular/navigation
// https://angular.dev/guide/routing

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonIcon,
  IonCard, IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons, IonIcon,
    IonCard, IonCardContent
  ]
})
export class DetailsPage implements OnInit {

  // person details from the TMDB api
  person: any = {};

  // list of movies this person has appeared in
  movies: any[] = [];

  // the person id comes from the url parameter
  personId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    addIcons({ heart, home });
  }

  // grabbing the person id from the url and fetching their details
  // https://angular.dev/guide/routing
  ngOnInit() {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPersonDetails();
    this.loadPersonMovies();
  }

  // fetches personal details of the cast or crew member
  // things like name, bio, birthday, also known as etc
  // https://developer.themoviedb.org/reference/person-details
  loadPersonDetails() {
    this.movieService.getPersonDetails(this.personId).subscribe((data: any) => {
      this.person = data;
    });
  }

  // fetches the list of movies this person has appeared in
  // https://developer.themoviedb.org/reference/person-movie-credits
  loadPersonMovies() {
    this.movieService.getPersonMovieCredits(this.personId).subscribe((data: any) => {
      this.movies = data.cast;
    });
  }

  // navigates to the movie details page when a movie is clicked
  // https://developer.themoviedb.org/reference/movie-credits
  goToMovieDetails(movie: any) {
    this.router.navigate(['/movie-details',
      movie.id,
      movie.overview || 'No overview available',
      movie.poster_path || 'none'
    ]);
  }

  // goes back to the home page
  goToHome() {
    this.router.navigate(['/home']);
  }

  // goes to the favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  // builds the full image url from the profile or poster path
  // https://developer.themoviedb.org/docs/image-basics
  getImageUrl(path: string): string {
    if (!path || path === 'none') {
      return 'assets/no-image.png';
    }
    return this.movieService.imageBase + path;
  }
}