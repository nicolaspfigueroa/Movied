import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  @Input() movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiClientService: ApiClientService
    ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiClientService.getMovie(id)
      .subscribe(movie => {
        movie.poster_path = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;
        this.movie = movie});
  }

  goBack(): void {
    this.location.back();
  }

}
