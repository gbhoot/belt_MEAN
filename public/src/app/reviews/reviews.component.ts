import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent implements OnInit {
    mid: string;
    reviews: any;
    movieTitle: string;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.getMovieTitle(params['id']);
            this.getReviewData(params['id']);
        });
    };

    getMovieTitle(id: string) {
        this.mid = id;
        let observable = this._httpService.getOneMovie(this.mid);
        observable.subscribe(data => {
            this.movieTitle = data['movie']['title'];
        });
    };

    getReviewData(id: string) {
        let observable = this._httpService.getAllReviewsForMovie(this.mid);
        observable.subscribe(data => {
            this.reviews = data['reviews'];
        });
    };

    deleteMovieBtnPressed() {
        let observable = this._httpService.deleteMovie(this.mid);
        observable.subscribe(data => {
            if (data['message'] == "Success") {
                this._router.navigate(['/movies']);
            } else {
                console.log(data);
            }
        });
    };

    deleteReviewBtnPressed(id: string) {
        let observable = this._httpService.deleteReviewForMovie(this.mid, id);
        observable.subscribe(data => {
            if (data['message'] == "Success") {
                this.getReviewData(this.mid);
            } else {
                console.log(data);
            }
        });
    };
}
