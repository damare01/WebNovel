import {Component, Input, OnChanges, OnInit} from '@angular/core'
import {Book} from '../../models/book'
import {UserService} from '../user.service'
import {Router} from '@angular/router'
import {AuthenticationService} from '../authentication.service'
import {User} from '../../models/user'
import {LikeService} from '../like.service'
import {ReadingHistoryService} from '../reading-history.service'

@Component({
  selector: 'wn-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit, OnChanges {

  @Input('books') books: Book[] = []
  bookInfoLoaded = false

  colors = [
    '#e67e22',
    '#d35400',
    '#f39c12',
    '#34495e',
    '#2980b9',
    '#16a085'
  ]

  constructor(private _userService: UserService,
              private router: Router,
              private _readingHistoryService: ReadingHistoryService) {
  }


  ngOnInit() {
  }

  ngOnChanges() {
  }

  openBook(book: Book) {
    this._readingHistoryService.getMyBookReadingHistory(book._id).subscribe(rh => {
      if (rh && rh.chapterIds.length) {
        this.router.navigate(['read', rh.chapterIds[rh.chapterIds.length - 1]])
      } else {
        this.router.navigate(['read', book.startChapter])
      }
    })
  }

}
