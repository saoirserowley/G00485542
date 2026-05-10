// movie-details.page.ts
// This page shows the details of a selected movie including cast and crew
// The movie id, overview and poster are passed in through the url as parameters
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
// ActivatedRoute lets us read the parameters from the url
// https://angular.dev/guide/routing

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons, IonIcon,
    IonCard, IonCardContent
  ]
})
export class MovieDetailsPage implements OnInit {

  // movie details passed through from the home page via the url
  movieId: number = 0;
  overview: string = '';
  poster: string = '';
  title: string = '';
  // cast and crew arrays populated from the TMDB api
  cast: any[] = [];
  crew: any[] = [];

  // tracks whether this movie is already in the favourites list
  isFavourite: boolean = false;

  // stores the full movie object for saving to favourites
  movie: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    addIcons({ heart, home });
  }

  // when the page loads we grab the url parameters and fetch cast and crew
  // https://angular.dev/guide/routing
  ngOnInit() {
    // reading the movie id, overview and poster from the url parameters
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.overview = this.route.snapshot.paramMap.get('overview') || '';
    this.poster = this.route.snapshot.paramMap.get('poster') || '';
    this.title = this.route.snapshot.paramMap.get('title') || '';

    // storing the movie object so we can save it to favourites if needed
    this.movie = {
      id: this.movieId,
      overview: this.overview,
      poster_path: this.poster,
      title: this.title
    };

    // checking if this movie is already in the favourites list
    // favourites are stored in localStorage so they persist after the app closes
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    this.checkIfFavourite();

    // fetching the cast and crew from the TMDB api
    this.loadCredits();
  }

  // gets the cast and crew for this movie from the api
  // // https://developer.themoviedb.org/reference/movie-credits
  loadCredits() {
    this.movieService.getMovieCredits(this.movieId).subscribe((data: any) => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  // checks localStorage to see if this movie is already a favourite
  // localStorage stores data as strings so we need to parse it back to an array
  // https://www.w3schools.com/jsref/prop_win_localstorage.asp
  checkIfFavourite() {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    this.isFavourite = false;
for (let f of favourites) {
  if (f.id === this.movieId) {
    this.isFavourite = true;
  }
}
  }

  // adds or removes the movie from favourites depending on current state
  toggleFavourite() {
    let favourites = JSON.parse(localStorage.getItem('favourites') || '[]');

    if (this.isFavourite) {
      // removing the movie from favourites
      favourites = favourites.filter((f: any) => f.id !== this.movieId);
      this.isFavourite = false;
    } else {
      // adding the movie to favourites
      favourites.push(this.movie);
      this.isFavourite = true;
    }

    // saving the updated favourites list back to localStorage
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  // navigates to the details page for a cast or crew member
  goToDetails(personId: number) {
    this.router.navigate(['/details', personId]);
  }

  // goes back to the home page
  goToHome() {
    this.router.navigate(['/home']);
  }

  // goes to the favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  // builds the full image url from the profile path
  // if no image is available, a placeholder image generated using Google Gemini is shown
  // https://developer.themoviedb.org/docs/image-basics
  getImageUrl(profilePath: string): string {
    if (!profilePath || profilePath === 'none') {
      return 'assets/no-image.png';
    }
    return this.movieService.imageBase + profilePath;
  }
}