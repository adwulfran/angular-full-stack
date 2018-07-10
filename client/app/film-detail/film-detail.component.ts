import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../shared/models/film.model';
import { User } from '../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FilmService } from '../services/film.service';

import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { DatacartService } from "../services/datacart.service";
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  user = new User();
  film = new Film();
  films: Film[] = [];
  itemqty = Number;
  message:any;
  isLoading = true;
  timeout: number = 1
  
  constructor(
  private route: ActivatedRoute,
  public toast: ToastComponent,
  private filmService: FilmService,
  private  userService: UserService,
  private auth: AuthService,
  private data: DatacartService,
  private location: Location
) {}

  ngOnInit() {
  this.getFilm();
  this.getUser();
  this.data.currentMessage.subscribe(message => this.message = message);
}

newMessage() {
    this.getUser();
setTimeout(() => {
      this.data.changeMessage(this.user.items.length);
    }, 1000);    
  }
// paramMap.get('id');
// params.urltorrent;
 getFilm() {
   const ligne = this.route.snapshot.params.ligne;
 this.filmService.getFilm(ligne)
    .subscribe(film => this.film = film);

}


 getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );

}


save(user: User) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
}


// il faut transmettre l'item à userService pour que updatecart fonctionne
updatecart(user: User, film : Film, itemqty : Number) {
    this.userService.updatecart(user, film, itemqty).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
}

totalcart(user: User) {
    this.userService.totalcart(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
}


 goBack(): void {
    this.location.back();
  }

}