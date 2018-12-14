import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NewReviewComponent } from './new-review/new-review.component';

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        NewMovieComponent,
        ReviewsComponent,
        NewReviewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})

export class AppModule { }
