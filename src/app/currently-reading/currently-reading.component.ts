import {Component, OnInit} from '@angular/core'
import {Book} from '../../models/book'
import {UserService} from '../user.service'
import {BookService} from '../book.service'
import {ReadingHistoryService} from '../reading-history.service'

@Component({
  selector: 'wn-currently-reading',
  templateUrl: './currently-reading.component.html',
  styleUrls: ['./currently-reading.component.css']
})
export class CurrentlyReadingComponent implements OnInit {

  currentlyReadingBooks: Book[] = []

  constructor(private _bookService: BookService, private _readingHistoryService: ReadingHistoryService) {
  }

  ngOnInit() {
    this._readingHistoryService.getMyReadingHistory().subscribe(rhs => {
      const bookIds: string[] = []
      rhs.forEach(rh => {
        if (rh.bookId) {
          bookIds.push(rh.bookId)
        }
      })
      if (bookIds.length) {
        this._bookService.getBooks(bookIds).subscribe(books => {
          this.currentlyReadingBooks = books
        })
      } else {
        this.currentlyReadingBooks = []
      }
    })
  }


}
