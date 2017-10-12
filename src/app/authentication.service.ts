import {Injectable} from '@angular/core'
import {Http, RequestOptions, RequestOptionsArgs, Headers, Response} from '@angular/http'
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable'
import * as jwtDecode from 'jwt-decode'

@Injectable()
export class AuthenticationService {

  refreshing: boolean = false

  constructor(private http: Http) {
  }

  login(email: string, password): Observable<any> {
    return this.http.post('/auth/login', {email: email, password: password})
      .map((response: Response) => {
        let user = response.json()
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
        }
        return user
      })
  }

  logout() {
    localStorage.removeItem('currentUser')
  }

  register(email: string, password: string, fullName: string, penName: string, captchaResponse: string) {
    return this.http.post('/auth/register', {
      email: email,
      password: password,
      fullName: fullName,
      penName: penName,
      captchaResponse: captchaResponse
    })
      .map((response: Response) => {
        let user = response.json()
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
        }
        return user
      })
  }

  refreshToken() {
    this.refreshing = true
    // ensure request options and headers are not null
    let options = new RequestOptions()
    options.headers = new Headers()

    // add authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      options.headers.append('Authorization', 'Bearer ' + currentUser.token)
    }

    this.http.post('/auth/refreshToken', {}, options).subscribe((response: Response) => {
      let user = response.json()
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
      this.refreshing = false
    })
  }

  isLoggedIn(): boolean {
    let currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      return false
    }
    let user = JSON.parse(localStorage.getItem('currentUser'))
    let userInfo = jwtDecode(user.token)
    let expires = userInfo.exp
    let issued = userInfo.iat
    let now = new Date().valueOf() / 1000
    let secondsSinceRefresh = now - issued
    if (secondsSinceRefresh > 60 * 60 && !this.refreshing) {
      this.refreshToken()
    }

    let loggedIn: boolean = expires - now > 0
    if (!loggedIn) {
      localStorage.removeItem('currentUser')
    }
    return loggedIn
  }

}
