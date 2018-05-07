import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


import { Film } from '../shared/models/film.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FilmService {

	private filmsUrl = 'api/film'; 

	constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>('/api/films');
  }

  countFilms(): Observable<number> { 
    return this.http.get<number>('/api/films/count');
  }

   /** GET hero by id. Will 404 if id not found */


   getFilm(ligne : number): Observable<Film> {
    return this.http.get<Film>(`/api/film/${ligne}`);
  }

   
  searchFilms(term: string): Observable<Film[]> {
    if (!term.trim()) {
      // if not search term, return empty film array.
      return of([]);
    }
    return this.http.get<Film[]>(`/api/filmssr/${term}`)
  
      
  }

 

  
}



