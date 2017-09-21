import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Http} from "@angular/http";
import {WnHttp} from "./wnhttp.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authenticationService: AuthenticationService, private http: WnHttp){}

  login(){
    this.authenticationService.login("ole@ole.no", "123321").subscribe((user)=>{
      console.log(user);
    });
  }

  logout(){
    this.authenticationService.logout();
  }

  testApi(){
    this.http.get("/chapters").subscribe(chapters =>{
      console.log(chapters);
    });
  }
}
