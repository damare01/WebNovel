import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../models/book";

@Component({
  selector: 'wn-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {

  @Input('books') books: Book[];
  constructor() { }


  ngOnInit() {
  }

}
