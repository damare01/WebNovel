import {Component, OnInit} from '@angular/core'
import {BookService} from '../book.service'
import {Book} from '../../models/book'

@Component({
  selector: 'wn-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  myBooks: Book[]

  constructor(private _bookService: BookService) {
  }

  ngOnInit() {
    this._bookService.getMyBooks().subscribe(books => {
      if (books) {
        this.myBooks = books
      } else {
        this.myBooks = []
      }
    })
  }

}
