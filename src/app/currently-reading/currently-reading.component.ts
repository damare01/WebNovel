import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {UserService} from "../user.service";
import {BookService} from "../book.service";

@Component({
  selector: 'wn-currently-reading',
  templateUrl: './currently-reading.component.html',
  styleUrls: ['./currently-reading.component.css']
})
export class CurrentlyReadingComponent implements OnInit {

  currentlyReadingBooks: Book[];

  constructor(private _userService: UserService, private _bookService: BookService) {
  }

  ngOnInit() {
    this._userService.getAllCurrentlyReading().subscribe(currentlyReading => {
      let bookIds: string[] = [];
      currentlyReading.forEach(cr => {
        if (cr.book) {
          bookIds.push(cr.book);
        }
      });
      if (bookIds.length) {
        this._bookService.getBooks(bookIds).subscribe(books => {
          this.currentlyReadingBooks = books;
        });
      }else{
        this.currentlyReadingBooks = [];
      }
    });
  }


}
