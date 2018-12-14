import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private _http: HttpClient) { }

    getAllMovies() {
        return this._http.get('/db/v1/movies');
    };

    getOneMovie(mid: string) {
        return this._http.get('/db/v1/movies/'+ mid);
    }

    getAllReviewsForMovie(mid: string) {
        return this._http.get('/db/v1/movies/'+ mid +
            '/reviews');
    };

    deleteReviewForMovie(mid: string, rid: string) {
        return this._http.delete('/db/v1/movies/'+ mid +
            '/reviews/'+ rid);
    };

    deleteMovie(mid: string) {
        return this._http.delete('/db/v1/movies/'+ mid);
    };

    createMovie(movie: any, review: any) {
        return this._http.post('/db/v1/movies', 
            {movie: movie, review: review});
    };

    createReviewForMovie(mid: string, review: any) {
        return this._http.post('/db/v1/movies/'+ mid +
            '/reviews', review);
    };
}
