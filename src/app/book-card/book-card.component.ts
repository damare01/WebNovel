import {Component, Input, OnInit} from '@angular/core'
import {Book} from '../../models/book'
import {BookService} from '../book.service'

@Component({
  selector: 'wn-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() bookId: string
  book: Book

  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this._bookService.getBook(this.bookId).subscribe(book => {
      this.book = book
    })
  }

}
