import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {
  }

  login(email: string, password): Observable<any>{
    return this.http.post('/auth/login', {email: email, password: password})
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  register(email: string, password: string, fullName:string, penName:string){
    return this.http.post('/auth/register', {email: email, password: password, fullName: fullName, penName: penName})
      .map((response: Response)=>{
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  static isLoggedIn():boolean{
    let currentUser = localStorage.getItem('currentUser');
    if(!currentUser){
      return false;
    }
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userInfo = jwtDecode(user.token);
    let expires = userInfo.exp;
    let now = new Date().valueOf()/1000;
    return expires - now > 0;
  }

}
