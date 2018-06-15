import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
//ajout de UserService...
import { UserService } from './services/user.service';
import { User } from './shared/models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {

   user: User;
    isLoading = true;  
  constructor(public auth: AuthService,
          public userService : UserService,
              private changeDetector: ChangeDetectorRef) { }

  // This fixes: https://github.com/DavideViolante/Angular-Full-Stack/issues/105
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

// ajout ...
   ngOnInit() {
    this.getUser();
}
    // ajout de getUser...
   getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}