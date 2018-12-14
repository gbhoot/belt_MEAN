import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewReviewComponent } from './new-review/new-review.component';

const routes: Routes = [
    {path: 'movies', component: MoviesComponent},
    {path: 'movies/new', component: NewMovieComponent},
    {path: 'movies/:id', component: ReviewsComponent},
    {path: 'movies/:id/review', component: NewReviewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
