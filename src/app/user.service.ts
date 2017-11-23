import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {CurrentlyReading} from '../models/currentlyreading'
import {Observable} from 'rxjs/Observable'
import {User} from '../models/user'
import * as jwtDecode from 'jwt-decode'

@Injectable()
export class UserService {

  localCurrentlyReadingKey = 'localCurrentlyReading'

  constructor(private _wnhttp: WnHttp) {
  }

  updateCurrentlyReading(currentlyReading: CurrentlyReading) {
    const tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      const currentlyReadingString = localStorage.getItem(this.localCurrentlyReadingKey) || '[]'
      const oldCurrentlyReading: CurrentlyReading[] = JSON.parse(currentlyReadingString)
      const newCurrentlyReading = oldCurrentlyReading.filter(cr => cr.book !== currentlyReading.book)
      newCurrentlyReading.push(currentlyReading)
      localStorage.setItem(this.localCurrentlyReadingKey, JSON.stringify(newCurrentlyReading))
      return Observable.of({})
    } else {
      return this._wnhttp.put('/users/self/currentlyreading', currentlyReading)
    }
  }

  getCurrentlyReading(bookId: string): Observable<CurrentlyReading> {
    const tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      const currentlyReadingString = localStorage.getItem(this.localCurrentlyReadingKey) || '[]'
      const currentlyReading: CurrentlyReading[] = JSON.parse(currentlyReadingString)
      const currentlyReadingBook = currentlyReading.find(cr => cr.book === bookId) || {}
      return Observable.of(currentlyReadingBook)
    } else {
      return this._wnhttp.get('/users/self/currentlyreading/' + bookId)
    }
  }

  getAllCurrentlyReading(): Observable<CurrentlyReading[]> {
    const tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      const currentlyReading = localStorage.getItem(this.localCurrentlyReadingKey) || '[]'
      return Observable.of(JSON.parse(currentlyReading))
    } else {
      return this._wnhttp.get('/users/self/currentlyreading/')
    }
  }

  getCurrentUser(): Observable<User> {
    const tokenString = localStorage.getItem('currentUser')
    if (!tokenString) {
      const emptyUser = new User()
      return Observable.of(emptyUser)
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

  getWordCount(userId: string): Observable<number> {
    return this._wnhttp.get(`/users/${userId}/wordcount`).map(wc => wc.count)
  }

  getBookCount(userId: string): Observable<number> {
    return this._wnhttp.get(`/users/${userId}/books/count`).map(bc => bc.count)
  }

  getChapterCount(userId: string): Observable<number> {
    return this._wnhttp.get(`/users/${userId}/chapters/count`).map(cc => cc.count)
  }
}
