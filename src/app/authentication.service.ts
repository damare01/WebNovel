import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

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

}
