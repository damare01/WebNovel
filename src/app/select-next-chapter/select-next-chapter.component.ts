import {Component, Input, OnChanges, OnInit} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {Chapter} from '../../models/chapter'
import {UserService} from '../user.service'
import {Router} from '@angular/router'
import {CurrentlyReading} from '../../models/currentlyreading'

@Component({
  selector: 'wn-select-next-chapter',
  templateUrl: './select-next-chapter.component.html',
  styleUrls: ['./select-next-chapter.component.css']
})
export class SelectNextChapterComponent implements OnInit, OnChanges {

  @Input() chapterId: string
  parentChapter: Chapter = new Chapter()
  children: Chapter[] = []

  loaded = false

  constructor(private _chapterService: ChapterService,
              private _userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.children = []
    this.loaded = false
    this._chapterService.getChapter(this.chapterId).subscribe(parentChapter => {
      this.parentChapter = parentChapter
      let counter = 0
      const tmpChildren = []
      const childrenLength = parentChapter.childrenIds.length
      if (childrenLength === 0) {
        this.loaded = true
      }
      parentChapter.childrenIds.forEach(childId => {
        this._chapterService.getChapter(childId).subscribe(child => {
          tmpChildren.push(child)
          if (++counter >= childrenLength) {
            this.children = tmpChildren
            this.loaded = true
          }
        })
      })
    })
  }

  ngOnChanges() {
    this.ngOnInit()
  }

  goToChapter(chapterId: string) {
    this._userService.getCurrentlyReading(this.parentChapter.book).subscribe(cr => {
      if (!cr) {
        cr = new CurrentlyReading()
        cr.book = this.parentChapter.book
      }
      if (!cr.chapterTrail) {
        cr.chapterTrail = []
      }
      const trailIndex = cr.chapterTrail.indexOf(chapterId)
      if (trailIndex === -1) {
        cr.chapterTrail.push(chapterId)
      } else {
        cr.chapterTrail = cr.chapterTrail.slice(0, trailIndex + 1)
      }
      this._userService.updateCurrentlyReading(cr).subscribe()
      this.router.navigate(['/read', chapterId])
    })
  }
}
