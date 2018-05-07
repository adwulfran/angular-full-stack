import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'ngbd-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css']
})
export class NgbdCarouselBasic implements OnInit {
 
  images : Array<string>;
	

  constructor(private _http: HttpClient) {}

 ngOnInit() {
    this._http.get('https://graph.facebook.com/v3.0/536931309766039/feed?access_token=EAACEdEose0cBALxzA2rLDiyqDO5bq1YniBXhjZBZCZCJWHLFzwrOO9Jqw5i3o8jcw7Ii94m1aMj8nbOWrmY7S6IQA8bBZAaNPXlHS4bSlkr89fJACvZCsXx4TSiKzphLEATguxQ0cHvmPiQATGc6LcICLlFExzqzmwZAzZCnIhKCIeSZA0Fubf2twW2INlijgzMZD&pretty=0&limit=25&after=Q2c4U1pXNTBYM0YxWlhKNVgzTjBiM0o1WDJsa0R5UTFNelk1TXpFek1EazNOall3TXprNkxUWTFNRFV5TkRBMk9UazBNREUzTmpFeU5UUVBER0ZA3YVY5emRHOXllVjlwWkE4ZA05UTTJPVE14TXpBNU56WTJNRE01WHpFME5UUTVORFV6TkRjNU5qUTJNallQQkhScGJXVUdXb2NxTUFFPQZDZD') // comme api sur local url il préférable d'utiliser FilmService :
   // this.filmService.getFilms()  au lieu de  this._http.get('/api/films')     ????
        .pipe(map((images: Array<{id: string}>) => this._randomImageUrls(images)))
        .subscribe(images => this.images = images);
  }

  private _randomImageUrls(images: Array<{id : string}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * 3)].id;
      return `http://obeflix.com/img/${randomId}`;
    });
  }
}

// http://obeflix.com/clients/img/future-man-s01.jpg

