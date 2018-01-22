import {Component, OnInit} from '@angular/core'
import {Genres} from '../../models/genres'
import {Book} from '../../models/book'
import {Chapter} from '../../models/chapter'
import {BookService} from '../book.service'
import {ChapterService} from '../chapter.service'
import {MatSnackBar} from '@angular/material'
import {Router} from '@angular/router'
import {UserService} from '../user.service'

@Component({
  selector: 'wn-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  genres: string[] = []
  languages: Language[] = []
  newBook: Book = new Book()
  newChapter: Chapter = new Chapter()

  saving = false

  constructor(private _bookService: BookService,
              private _chapterService: ChapterService,
              private snackBar: MatSnackBar,
              private router: Router,
              private _userService: UserService) {
    this.convertEnumToArray()
    this.addLanguages()
  }

  ngOnInit() {
  }

  convertEnumToArray() {
    for (const item in Genres) {
      if (isNaN(Number(item))) {
        this.genres.push(item)
      }
    }
  }

  addLanguages() {
    const english: Language = {code: 'en', name: 'English'}
    const norwegian: Language = {code: 'no', name: 'Norsk'}
    this.languages.push(english)
    this.languages.push(norwegian)
  }

  saveBook() {
    if (!this.newChapter.title || !this.newChapter.body) {
      this.snackBar.open('Please write the first chapter', 'DISMISS', {
        duration: 3000
      })
    } else if (!this.newBook.title || !this.newBook.genre || !this.newBook.language) {
      this.snackBar.open('Please fill in all the fields', 'DISMISS', {
        duration: 3000
      })
    } else {
      this.saving = true
      this.newChapter.author = this._userService.getCurrentUserId()
      this._chapterService.saveChapter(this.newChapter).subscribe(chapterId => {
        this.newBook.startChapter = chapterId
        this.newChapter._id = chapterId
        this._bookService.saveBook(this.newBook).subscribe(bookId => {
          this.newChapter.book = bookId
          this._chapterService.updateChapter(this.newChapter).subscribe(res => {
            this.router.navigate([`/read/${chapterId}`])
          })
        })
      })
    }
  }
}

class Language {
  code: string
  name: string
}
