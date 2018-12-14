import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-movie',
    templateUrl: './new-movie.component.html',
    styleUrls: ['./new-movie.component.css']
})

export class NewMovieComponent implements OnInit {
    movieD: any;
    reviewD: any;

    constructor(
        private _httpService: HttpService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.resetMovie();
    }

    resetMovie() {
        this.movieD = {
            title: ""
        };
        this.reviewD = {
            name: "",
            rating: "",
            review: ""
        };
    };

    createNewMovie(event: any) {
        let observable = this._httpService.createMovie(this.movieD, this.reviewD);
        observable.subscribe(data => {
            if (data['message'] == "Success") {
                this._router.navigate(['/movies']);
            } else {
                console.log(data);
                let errorMsg = "";
                let errors = data['errors'];
                for (var error in errors) {
                    errorMsg += errors[error]['message'] +'. ';
                }
                alert(errorMsg);
            };
        });
    };
}
