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
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  @Input() user: User;
  film = new Film();
  films: Film[] = [];
  isLoading = true;
  
  constructor(
  private route: ActivatedRoute,
  public toast: ToastComponent,
  private filmService: FilmService,
  private  userService: UserService,
  private auth: AuthService,
  private location: Location
) {}

  ngOnInit(): void {
  this.getFilm();
  this.getUser();
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


/* il faut transmettre l'item à userService pour que updatecart fonctionne
updatecart(user: User) {
    this.userService.updatecart(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
}

*/


 goBack(): void {
    this.location.back();
  }

}
