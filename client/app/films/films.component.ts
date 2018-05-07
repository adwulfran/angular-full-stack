import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FilmService } from '../services/film.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Film } from '../shared/models/film.model';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

	film = new Film();
  films: Film[] = [];
  isLoading = true;
  isEditing = false;

  addFilmForm: FormGroup;
  nom = new FormControl('', Validators.required);
  categorie = new FormControl('', Validators.required);
  openload = new FormControl('', Validators.required);

  constructor(private filmService: FilmService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getFilms();
    
  }

  getFilms() {
    this.filmService.getFilms().subscribe(films => this.films = films.slice(1, 8));
  }
  

}
