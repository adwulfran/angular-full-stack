import { Component, OnInit, Input  } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { Film } from '../shared/models/film.model';
import { Useritems } from '../shared/models/useritems.model';
import { FilmService } from '../services/film.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatacartService } from "../services/datacart.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

 user = new User();
  film = new Film();
  films: Film[] = [];
  isLoading = true;
  message: any;
  timeout: number = 1;
  useritems : Useritems[] = [];
  pets: any[] = [];


  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private data: DatacartService,
              private userService: UserService) { }


  ngOnInit() {
    this.getUser();
    this.data.currentMessage.subscribe(message => this.message = message); 
    
    
  }

  newMessage() {
    
      this.data.changeMessage(0);
       
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
    setTimeout(() => {
      this.getUseritems();
}, 1000); 
    
    
}


  getUseritems() { 
   let pets: any[] = this.user.items;
  console.log("ICI ON ATTEND "+JSON.stringify(this.pets)); 
    for (let pet of pets) {
        this.useritems.push(pet); // "0", "1", "2",
    }
    console.log("ICI ON ATTEND??? "+JSON.stringify(this.useritems)); 

    
  }

  
  deletecart(user: User) {
   
    this.userService.deletecart(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
   
}






}
