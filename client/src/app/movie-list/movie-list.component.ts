import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];

  categoryMovies: Movie[] = [];

  movie: Movie;

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit(): void {
    this.getDiscover();
    this.getCategory(28);
  }

  getDiscover(): void {
    this.apiClientService.getDiscoverMovies()
    .subscribe(movies => this.movies = movies);
  }

  getCategory(categoryId: number): void {
    this.apiClientService.getCategoryMovies(categoryId)
    .subscribe(movies => {
      movies.forEach(movie => {
        movie.poster_path = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;
      })
      this.categoryMovies = movies});
  }

}
