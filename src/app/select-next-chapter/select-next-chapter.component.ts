import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {Chapter} from '../../models/chapter'
import {UserService} from '../user.service'
import {Router} from '@angular/router'
import {CurrentlyReading} from '../../models/currentlyreading'
import {EdgeService} from '../edge.service'
import {ReadingHistoryService} from '../reading-history.service'
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'wn-select-next-chapter',
  templateUrl: './select-next-chapter.component.html',
  styleUrls: ['./select-next-chapter.component.css']
})
export class SelectNextChapterComponent implements OnInit, OnChanges {

  @Input() parentChapter: Chapter = new Chapter()
  children: Chapter[] = []

  @Output() createPathClick = new EventEmitter<boolean>()


  constructor(private _chapterService: ChapterService,
              private _userService: UserService,
              private router: Router,
              private _edgeService: EdgeService,
              private _readingHistoryService: ReadingHistoryService,
              private _authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.ngOnInit()
  }

  goToLastChapter() {
    this._readingHistoryService.getMyBookReadingHistory(this.parentChapter.book).subscribe(rh => {
      if (rh.chapterIds && rh.chapterIds.length > 1) {
        rh.chapterIds.splice(rh.chapterIds.length - 1)
        this._readingHistoryService.saveReadingHistory(rh).subscribe()
        this.router.navigate(['/read', rh.chapterIds[rh.chapterIds.length - 1]])
        if (typeof window != 'undefined'){
          window.scrollTo(0,0)
        }
      }
    })
  }

  createNewPath() {
    this.createPathClick.emit(true)
  }

  isLoggedIn(): boolean{
    return this._authService.isLoggedIn()
  }
}
