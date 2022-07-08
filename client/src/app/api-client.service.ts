import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  rootUrl = 'http://movied.herokuapp.com';

  constructor(private http: HttpClient) { }

  getDiscoverMovies(): Observable<Movie[]> {
    let val = this.http.get<Movie[]>(`${this.rootUrl}/discover`).pipe(map((movies) => movies.map((movie) => {
      return {...movie, poster_path: "https://image.tmdb.org/t/p/w300/"+movie.poster_path}
    }
    )));
    return val;
  };

  getCategoryMovies(categoryId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.rootUrl}/categories/${categoryId}`);
  };

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.rootUrl}/movie/${id}`);
  }
}
