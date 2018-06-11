import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FilmService } from '../services/film.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Film } from '../shared/models/film.model';
import { ActivatedRoute } from '@angular/router';

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
	hideElement = true;
	showSelected: boolean;

	addFilmForm: FormGroup;
	nom = new FormControl('', Validators.required);
	categorie = new FormControl('', Validators.required);
	openload = new FormControl('', Validators.required);

	constructor(private filmService: FilmService,
		private formBuilder: FormBuilder,
		public toast: ToastComponent)
	{

		this.showSelected = true;
	}
	ShowSerie() {
		this.showSelected = true;
		this.filmService.getFilterFilms("Serie").subscribe(films => this.films = films.slice(0, 8));
	}

	ShowFilm() {
		this.showSelected = true;
		this.filmService.getFilterFilms("Film").subscribe(films => this.films = films.slice(0, 8));
	}
	HideButton() {
		this.showSelected = false;
	}

	ngOnInit() {
		this.getFilms();

	}

	getFilms() {
		this.filmService.getFilms().subscribe(films => this.films = films.slice(0, 8));
	}


}
