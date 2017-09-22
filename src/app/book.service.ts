import {Injectable} from '@angular/core';
import {WnHttp} from "./wnhttp.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';
import {Book} from "../models/book";

@Injectable()
export class BookService {

  constructor(private wnhttp: WnHttp) {
  }

  getBooks(): Observable<Book[]> {
    return this.wnhttp.get('/books')
  }

  getBook(id: string): Observable<Book> {
    return this.wnhttp.get("/books/id/" + id);
  }

  saveBook(book: Book): Observable<Response> {
    return this.wnhttp.post('/books', book);
  }

}
