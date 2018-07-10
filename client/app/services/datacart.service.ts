import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '/root/meanstack/angular-full-stack/client/app/shared/models/user.model';
import { AuthService } from '/root/meanstack/angular-full-stack/client/app/services/auth.service';
import { UserService } from '/root/meanstack/angular-full-stack/client/app/services/user.service';
@Injectable()
export class DatacartService {

 private messageSource = new BehaviorSubject('');
currentMessage = this.messageSource.asObservable();
  
user = new User();
  isLoading = true;
  constructor( private  userService: UserService,
private auth: AuthService) { }

   ngOnInit() {
    this.getUser();
   
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

   getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    )
          
      
}


}