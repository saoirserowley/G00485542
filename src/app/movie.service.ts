// movie.service.ts
// This is the service that handles all the TMDB API calls for the app
// A service in Angular is a class that can be shared and reused across pages
// Used to understand how services work:https://angular.dev/guide/di/creating-and-using-services
// General info on APIs: https://www.w3schools.com/js/js_api_intro.asp

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// HttpClient lets us make HTTP requests to external APIs
// https://angular.dev/guide/http
// Observables are used to handle async data, similar to promises
// https://rxjs.dev/guide/observable

@Injectable({
  providedIn: 'root' // makes this service available to the whole app
})
export class MovieService {

  // TMDB API key needed to authenticate all requests
  // https://developers.themoviedb.org/3/getting-started/authentication
  private apiKey = '0bd5e0941c602089a323c9d8e48530b0';

  // base URL for all TMDB API endpoints
  // https://developers.themoviedb.org/3/getting-started/introduction
  private baseUrl = 'https://api.themoviedb.org/3';

  // base URL for loading images from TMDB
  // https://developers.themoviedb.org/3/getting-started/images
  public imageBase = 'https://image.tmdb.org/t/p/w500';

  // HttpClient is injected so we can use it to make API calls
  // Dependancy injection guide: https://angular.dev/guide/di
  constructor(private http: HttpClient) {}

  // gets todays trending movies from TMDB
  // https://developers.themoviedb.org/3/trending/get-trending
  getTrending(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`);
  }

  // searches for movies by name using the search endpoint
  // query is whatever the user types into the search bar
  // https://developers.themoviedb.org/3/search/search-movies
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`);
  }

  // gets the cast and crew for a specific movie using its id
  // https://developers.themoviedb.org/3/movies/get-movie-credits
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  // gets personal details about a cast or crew member by their id
  // https://developers.themoviedb.org/3/people/get-person-details
  getPersonDetails(personId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${personId}?api_key=${this.apiKey}`);
  }

  // gets the list of movies a person has appeared in
  // https://developers.themoviedb.org/3/people/get-person-movie-credits
  getPersonMovieCredits(personId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${personId}/movie_credits?api_key=${this.apiKey}`);
  }
}