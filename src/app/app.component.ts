import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Http} from "@angular/http";
import {WnHttp} from "./wnhttp.service";
import {ChapterService} from "./chapter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService, private chapterService: ChapterService){}

  login(){
    this.authenticationService.login("ole@ole.no", "123321").subscribe((user)=>{
      console.log(user);
    });
  }

  logout(){
    this.authenticationService.logout();
  }

  testApi(){
    this.chapterService.getChapters().subscribe(chapters =>{
      console.log(chapters);
    });
  }

  isLoggedIn():boolean{
    return this.authenticationService.isLoggedIn();
  }
}
