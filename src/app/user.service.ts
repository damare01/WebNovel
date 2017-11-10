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

  getCurrentUser(): Observable<User> {
    const tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      return null
    }
    const token = JSON.parse(tokenString).token
    const user = jwtDecode(token)

    return this.getUser(user._id)
  }

  getCurrentUserId(): string {
    const tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      return null
    }
    const token = JSON.parse(tokenString).token
    const user = jwtDecode(token)

    return user._id
  }

  getUser(id: string): Observable<User> {
    return this._wnhttp.get('/users/' + id)
  }

  updateUser(user: User) {
    return this._wnhttp.put('/users', user)
  }

  updatePassword(oldPassword, newPassword): Observable<User> {
    return this._wnhttp.put('/users/changepass', {oldPassword: oldPassword, newPassword: newPassword})
  }
}
