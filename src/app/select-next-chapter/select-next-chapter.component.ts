import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {Chapter} from '../../models/chapter'
import {UserService} from '../user.service'
import {Router} from '@angular/router'
import {CurrentlyReading} from '../../models/currentlyreading'
import {EdgeService} from '../edge.service'
import {ReadingHistoryService} from '../reading-history.service'

@Component({
  selector: 'wn-select-next-chapter',
  templateUrl: './select-next-chapter.component.html',
  styleUrls: ['./select-next-chapter.component.css']
})
export class SelectNextChapterComponent implements OnInit, OnChanges {

  @Input() chapterId: string
  parentChapter: Chapter = new Chapter()
  children: Chapter[] = []

  @Output() createPathClick = new EventEmitter<boolean>()

  loaded = false

  constructor(private _chapterService: ChapterService,
              private _userService: UserService,
              private router: Router,
              private _edgeService: EdgeService,
              private _readingHistoryService: ReadingHistoryService) {
  }

  ngOnInit() {
    this.children = []
    this.loaded = false
    this._chapterService.getChapter(this.chapterId).subscribe(parentChapter => {
      this.parentChapter = parentChapter
      this._edgeService.getEdgesFromNode(parentChapter.book, this.chapterId).subscribe(edges => {
        const childrenIds = edges.map(edge => edge.target)
        let counter = 0
        const tmpChildren = []
        const childrenLength = childrenIds.length
        if (childrenLength === 0) {
          this.loaded = true
        }
        childrenIds.forEach(childId => {
          this._chapterService.getChapter(childId).subscribe(child => {
            tmpChildren.push(child)
            if (++counter >= childrenLength) {
              this.children = tmpChildren
              this.loaded = true
            }
          })
        })
      })

    })
  }

  ngOnChanges() {
    this.ngOnInit()
  }

  updateReadingHistory(chapter: Chapter) {
    this._readingHistoryService.getMyBookReadingHistory(chapter.book).subscribe(rh => {
      if (rh.chapterIds.length < 1) {
        return
      } else if (rh.chapterIds[rh.chapterIds.length - 1] !== chapter._id) {
        rh.chapterIds.push(chapter._id)
        this._readingHistoryService.saveReadingHistory(rh).subscribe()
      }
    })
  }


  goToLastChapter() {
    this._readingHistoryService.getMyBookReadingHistory(this.parentChapter.book).subscribe(rh => {
      if (rh.chapterIds.length > 1) {
        rh.chapterIds.splice(rh.chapterIds.length - 1)
        this._readingHistoryService.saveReadingHistory(rh).subscribe()
        this.router.navigate(['/read', rh.chapterIds[rh.chapterIds.length - 1]])
      }
    })
  }

  goToChapter(chapterId: string) {
    const childChapter = this.children.find(chapter => chapter._id === chapterId)
    this.router.navigate(['/read', chapterId])
    this.updateReadingHistory(childChapter)
  }

  createNewPath() {
    this.createPathClick.emit(true)
  }
}
