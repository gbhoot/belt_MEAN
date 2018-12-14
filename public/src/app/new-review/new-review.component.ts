import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'app-new-review',
    templateUrl: './new-review.component.html',
    styleUrls: ['./new-review.component.css']
})

export class NewReviewComponent implements OnInit {
    mid: string;
    movieTitle: string;
    reviewD: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            this.getMovieTitle(params['id']);
        });
        this.resetRating();
    };
    
    getMovieTitle(id: string) {
        this.mid = id;
        let observable = this._httpService.getOneMovie(this.mid);
        observable.subscribe(data => {
            this.movieTitle = data['movie']['title'];            
        });
    };

    resetRating() {
        this.reviewD = {
            name: "",
            rating: "",
            review: ""
        };
    };

    createNewReviewForMovie(event: any) {
        let observable = this._httpService.createReviewForMovie(this.mid, this.reviewD);
        observable.subscribe(data => {
            if (data['message'] == "Success") {
                this._router.navigate(['/movies/'+this.mid]);
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
