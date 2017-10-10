import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'wn-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {

  @Input('books') books: Book[];

  constructor(private _userService: UserService, private router: Router) {
  }


  ngOnInit() {
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
