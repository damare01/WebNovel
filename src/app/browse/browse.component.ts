import {Component, OnInit} from '@angular/core'
import {BookService} from '../book.service'
import {Book} from '../../models/book'

@Component({
  selector: 'wn-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  books: Book[]

  constructor(private _bookService: BookService) {
  }

  ngOnInit() {
    this._bookService.getAllBooks().subscribe(books => {
      this.books = books
    })
  }
}
