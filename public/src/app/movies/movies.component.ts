import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {
    movies: any;

    constructor(
        private _httpService: HttpService
    ) { }

    ngOnInit() {
        this.getMovieData();
    }

    getMovieData() {
        let observable = this._httpService.getAllMovies();
        observable.subscribe(data => {
            this.movies = data['movies'];
            for (var movie in this.movies) {
                this.getMovieRatingAverages(Number(movie));
            }
        });
    };

    getMovieRatingAverages(idx: number) {
        let observable = this._httpService.getAllReviewsForMovie(this.movies[idx]['_id']);
        observable.subscribe(data => {
            let reviews = data['reviews'];
            let sum = 0;
            for (let review of reviews) {
                sum += review['rating'];
            }
            this.movies[idx]['ratingAvg'] = sum / reviews.length;
        });
    };
}
