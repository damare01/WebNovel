import {Injectable} from '@angular/core'
import {Http, RequestOptions, RequestOptionsArgs, Headers, Response} from '@angular/http'

import {Observable} from 'rxjs'
import * as jwtDecode from 'jwt-decode'
import {SocketService} from './socket.service'

@Injectable()
export class AuthenticationService {

  refreshing = false

  constructor(private http: Http,
              private _socketService: SocketService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/auth/login', {email: email, password: password})
      .map((response: Response) => {
        const user = response.json()
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this._socketService.registerUser()
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
        const user = response.json()
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this._socketService.registerUser()
        }
        return user
      })
  }

  refreshToken(): void {
    this.refreshing = true
    // ensure request options and headers are not null
    const options = new RequestOptions()
    options.headers = new Headers()

    // add authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      options.headers.append('Authorization', 'Bearer ' + currentUser.token)
    }

    this.http.post('/auth/refreshToken', {}, options).subscribe((response: Response) => {
      const user = response.json()
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
      this.refreshing = false
    })
  }

  isLoggedIn(): boolean {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      return false
    }
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const userInfo = jwtDecode(user.token)
    const expires = userInfo.exp
    const issued = userInfo.iat
    const now = new Date().valueOf() / 1000
    const secondsSinceRefresh = now - issued
    if (secondsSinceRefresh > 60 * 60 && !this.refreshing) {
      this.refreshToken()
    }

    const loggedIn: boolean = expires - now > 0
    if (!loggedIn) {
      localStorage.removeItem('currentUser')
    }
    return loggedIn
  }

  getAuthToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.token) {
      return currentUser.token
    } else {
      return ''
    }
  }

}
