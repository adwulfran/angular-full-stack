import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../shared/models/film.model';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  @Input() film: Film;
  constructor(
  private route: ActivatedRoute,

  private filmService: FilmService,
  private location: Location
) {}

  ngOnInit(): void {
  this.getFilm();
}
// paramMap.get('id');
// params.urltorrent;
 getFilm() {
 	const ligne = this.route.snapshot.params.ligne;
 this.filmService.getFilm(ligne)
    .subscribe(film => this.film = film);

}




 goBack(): void {
    this.location.back();
  }

}
