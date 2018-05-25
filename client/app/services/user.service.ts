import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/models/user.model';
import { Film } from '../shared/models/film.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  login(credentials): Observable<any> {
    return this.http.post<any>('/api/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/user/${user._id}`);
  }

  editUser(user: User): Observable<string> {
    return this.http.put(`/api/user/${user._id}`, user, { responseType: 'text' });
  }

// updatecart doit aussi prendre item, comment lui transmettre ?
updatecart(user: User, film: Film): Observable<string> {
   return this.http.get<string>(`/api/usercart/${user._id}/${film.nom}`);
  }

  deleteUser(user: User): Observable<string> {
    return this.http.delete(`/api/user/${user._id}`, { responseType: 'text' });
  }

}
