import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {UserService} from '../user.service'
import {User} from '../../models/user'
import {ChapterService} from '../chapter.service'
import {BookService} from '../book.service'
import {Chapter} from '../../models/chapter'
import {Book} from '../../models/book'
import {ColorService} from '../color.service'

@Component({
  selector: 'wn-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: User
  userChapters: Chapter[] = []
  userBooks: Book[] = []

  @ViewChild('bio') bioDiv: ElementRef
  bioText: any
  oldBioText: any
  bioEditable = false

  color: string

  constructor(private route: ActivatedRoute,
              private _userService: UserService,
              private _chapterService: ChapterService,
              private _bookService: BookService,
              private _colorService: ColorService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userId']
      this._userService.getUser(userId).subscribe(user => {
        this.user = user
        this.setColor()
        this.getUserChapters()
        this.getUserBooks()
      })
    })
  }

  updateBio(text: any) {
    this.bioText = text
  }

  saveBio() {
    if (this.bioText) {
      this.user.bio = this.bioText
      this._userService.updateUser(this.user).subscribe(user => {
      }, err => {
      })
    }
    this.toggleBioEditable()
  }

  cancel() {
    this.bioDiv.nativeElement.innerHTML = this.oldBioText
    this.toggleBioEditable()
  }

  toggleBioEditable() {
    if (!this.bioEditable) {
      this.oldBioText = this.bioDiv.nativeElement.innerText
    }
    this.bioEditable = !this.bioEditable
  }

  canEdit() {
    const currentUserId = this._userService.getCurrentUser()._id
    return currentUserId === this.user._id
  }

  setColor() {
    const name = this.user.penName || this.user.fullName
    this.color = this._colorService.getColorFromName(name)
  }

  getUserChapters() {
    this._chapterService.getUserChapters(this.user._id).subscribe(chapters => {
      chapters.sort((a, b) => {
        return b.views - a.views
      })
      this.userChapters = chapters
    })
  }

  getUserBooks() {
    this._bookService.getUserBooks(this.user._id).subscribe(books => {
      this.userBooks = books
    })
  }

}
