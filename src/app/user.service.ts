import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {CurrentlyReading} from '../models/currentlyreading'
import {Observable} from 'rxjs/Observable'
import {User} from '../models/user'
import * as jwtDecode from 'jwt-decode'

@Injectable()
export class UserService {

  constructor(private _wnhttp: WnHttp) {
  }

  updateCurrentlyReading(currentlyReading: CurrentlyReading) {
    return this._wnhttp.put('/users/currentlyreading', currentlyReading)
  }

  getCurrentlyReading(bookId: string): Observable<CurrentlyReading> {
    return this._wnhttp.get('/users/currentlyreading/' + bookId)
  }

  getAllCurrentlyReading(): Observable<CurrentlyReading[]> {
    return this._wnhttp.get('/users/currentlyreading/')
  }

  getCurrentUser(): User {
    let tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      return new User()
    }
    let token = JSON.parse(tokenString).token
    let user = jwtDecode(token)
    return user
  }

  getUser(id: string): Observable<User> {
    return this._wnhttp.get('/users/' + id)
  }
}
