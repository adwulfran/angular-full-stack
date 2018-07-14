import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
//+ DatacartService...
import { DatacartService } from "./services/datacart.service";
import { UserService } from './services/user.service';
import { User } from '/root/meanstack/angular-full-stack/client/app/shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {

   // + message containing user.items.length; 
   user = new User();
   message:any;
   isLoading = true;  
  constructor(public auth: AuthService,
              private data: DatacartService,
              private userService: UserService,
              private changeDetector: ChangeDetectorRef) { }

  // This fixes: https://github.com/DavideViolante/Angular-Full-Stack/issues/105
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

// ajout ...
   ngOnInit() {
    this.getUser();
   this.data.currentMessage.subscribe(message => this.message = message);
  }
    
   getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    )
    this.newMessage();
  
     
      
}

newMessage() {
    
setTimeout(() => {
      this.data.changeMessage(this.user.items.length);
    }, 1000);    
  }

}