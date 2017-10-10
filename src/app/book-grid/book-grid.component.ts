import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {User} from "../../models/user";
import {LikeService} from "../like.service";

@Component({
  selector: 'wn-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit, OnChanges {

  @Input('books') books: Book[];
  allBooks: BookInfo[] = [];
  bookInfoLoaded: boolean = false;

  constructor(private _userService: UserService, private router: Router, private _likeService: LikeService) {
  }


  ngOnInit() {
  }

  ngOnChanges(){
    this.allBooks = [];
    let counter = 0;
    this.books.forEach(book=>{
      let bookInfo = new BookInfo();
      bookInfo.book = book;
      this._userService.getUser(book.creator).subscribe(user =>{
        bookInfo.creator= user;
        this.allBooks.push(bookInfo);
        this.updateBookInfoLoaded();
      });
    });
  }

  updateBookInfoLoaded(){
    this.bookInfoLoaded = (this.allBooks.length === this.books.length);
  }

  openBook(book: Book) {
    if (!AuthenticationService.isLoggedIn()) {
      this.router.navigate(['read', book.startChapter]);
    } else {
      this._userService.getCurrentlyReading(book._id).subscribe(cr => {
        if (cr && cr.chapterTrail) {
          this.router.navigate(['read', cr.chapterTrail[cr.chapterTrail.length - 1]]);
        } else {
          this.router.navigate(['read', book.startChapter]);
        }
      });
    }

  }

}

class BookInfo{
  book: Book;
  creator: User;
}
