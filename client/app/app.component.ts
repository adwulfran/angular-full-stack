import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
//+ DatacartService...
import { DatacartService } from "./services/datacart.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {

   // + message containing user.items.length; 
   message:any;
   isLoading = true;  
  constructor(public auth: AuthService,
              private data: DatacartService,
              private changeDetector: ChangeDetectorRef) { }

  // This fixes: https://github.com/DavideViolante/Angular-Full-Stack/issues/105
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

// ajout ...
   ngOnInit() {
    //this.getUser();
    this.data.currentMessage.subscribe(message => this.message = message);
  }
    

}