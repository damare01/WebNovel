import {Component, OnInit} from '@angular/core';
import {Genres} from "../../models/genres";
import {Book} from "../../models/book";
import {Chapter} from "../../models/chapter";
import {BookService} from "../book.service";
import {ChapterService} from "../chapter.service";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'wn-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  genres: string[] = [];
  languages: Language[] = [];
  newBook: Book = new Book();
  newChapter: Chapter = new Chapter();

  saving:boolean = false;

  constructor(private _bookService: BookService, private _chapterService: ChapterService, private snackBar: MdSnackBar, private router: Router) {
    this.convertEnumToArray();
    this.addLanguages();
  }

  ngOnInit() {
  }

  convertEnumToArray() {
    for (let item in Genres) {
      if (isNaN(Number(item))) {
        this.genres.push(item);
      }
    }
  }

  addLanguages(){
    let english: Language = {code: "en", name:"English"};
    let norwegian: Language = {code:'no', name:"Norsk"};
    this.languages.push(english);
    this.languages.push(norwegian);
  }

  saveBook(){
    this.saving = true;

    if(!this.newChapter.title || !this.newChapter.body){
      this.snackBar.open('Please write a the first chapter', 'Dismiss', {
        duration: 3000
      });
    }else if(!this.newBook.title || !this.newBook.genre || !this.newBook.language){
      this.snackBar.open('Please fill in all the fields', 'Dismiss', {
        duration: 3000
      });
    }else{
      this._chapterService.saveChapter(this.newChapter).subscribe(chapterId=>{
        this.newBook.startChapter = chapterId;
        this.newChapter._id = chapterId;
        this._bookService.saveBook(this.newBook).subscribe(bookId =>{
          this.newChapter.book = bookId;
          this._chapterService.updateChapter(this.newChapter).subscribe(res =>{
            this.router.navigate(['/browse']);
          });
        })
      });
    }
  }
}

class Language{
  code: string;
  name: string;
}
