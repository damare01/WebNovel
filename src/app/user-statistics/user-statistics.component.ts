import {Component, Input, OnInit} from '@angular/core'
import {UserService} from '../user.service'

@Component({
  selector: 'wn-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {

  @Input() userId
  wordCount = 0
  bookCount = 0
  chapterCount = 0

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getWordCount(this.userId).subscribe(wc => {
      this.wordCount = wc
    })
    this._userService.getBookCount(this.userId).subscribe(bc => {
      this.bookCount = bc
    })
    this._userService.getChapterCount(this.userId).subscribe(cc => {
      this.chapterCount = cc
    })
  }

}
