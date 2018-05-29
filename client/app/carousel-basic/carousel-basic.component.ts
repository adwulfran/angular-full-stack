import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'ngbd-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css']
})
export class NgbdCarouselBasic implements OnInit {
 
  images : Array<string>;
	

  constructor(private _http: HttpClient,
                private filmService: FilmService
              ) {}

 ngOnInit() {
    this.filmService.getFilms() // comme api sur local url il préférable d'utiliser FilmService :
   // this.filmService.getFilms()  au lieu de  this._http.get('/api/films')    
        .pipe(map((images: Array<{urltorrent: string}>) => this._randomImageUrls(images)))
        .subscribe(images => this.images = images);
  }

  private _randomImageUrls(images: Array<{urltorrent : string}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * 3)].urltorrent;
      return `http://obeflix.com/clients/img/${randomId}`;
    });
  }
}

// http://obeflix.com/clients/img/future-man-s01.jpg

