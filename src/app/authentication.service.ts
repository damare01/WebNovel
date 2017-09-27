import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

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

  register(email: string, password: string, fullName:string){
    return this.http.post('/auth/register', {email: email, password: password, fullName: fullName})
      .map((response: Response)=>{
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  isLoggedIn():boolean{
    let user = localStorage.getItem('currentUser');
    return !isNullOrUndefined(user);
  }

}
