import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import {Response} from '@angular/http'
import {Book} from '../models/book'

@Injectable()
export class BookService {

  constructor(private wnhttp: WnHttp) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.wnhttp.get('/books')
  }

  getBooks(ids: string[]): Observable<Book[]> {
    return this.wnhttp.get('/books/' + ids)
  }

  getBook(id: string): Observable<Book> {
    return this.wnhttp.get('/books/id/' + id)
  }

  saveBook(book: Book): Observable<string> {
    return this.wnhttp.post('/books', book)
  }

  getMyBooks(): Observable<Book[]> {
    return this.wnhttp.get('/books/mybooks')
  }

  getUserBooks(userId: string) {
    return this.wnhttp.get(`/users/${userId}/books`)
  }
}
