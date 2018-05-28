import {Component, Input, OnChanges, OnInit} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {EdgeService} from '../edge.service'
import {Chapter} from '../../models/chapter'
import {Router} from '@angular/router'
import {ReadingHistoryService} from '../reading-history.service'

@Component({
  selector: 'wn-children-carousel',
  templateUrl: './children-carousel.component.html',
  styleUrls: ['./children-carousel.component.css']
})
export class ChildrenCarouselComponent implements OnInit, OnChanges {

  @Input() parentChapter: Chapter
  children: Chapter[] = []

  childrenPresented: Chapter[] = []

  hasNext: boolean = false
  hasPrev: boolean = false
  startChildIndex: number = -3
  endChildIndex: number = 0

  loaded: boolean = false

  constructor(private _chapterService: ChapterService,
              private _edgeService: EdgeService,
              private router: Router,
              private _readingHistoryService: ReadingHistoryService) {
  }

  nextChildren() {
    this.startChildIndex += 3
    this.endChildIndex += 3
    this.hasNext = this.children.slice(this.endChildIndex).length ? true : false
    this.childrenPresented = this.children.slice(this.startChildIndex, this.endChildIndex)
    this.hasPrev = this.startChildIndex >= 3
  }

  prevChildren() {
    this.hasPrev = this.startChildIndex >= 3
    if (this.hasPrev) {
      this.startChildIndex -= 3
      this.endChildIndex -= 3
      this.hasNext = this.children.slice(this.endChildIndex).length ? true : false
      this.hasPrev = this.startChildIndex >= 3
      this.childrenPresented = this.children.slice(this.startChildIndex, this.endChildIndex)
    }

  }

  goToChapter(chapter: Chapter) {
    this.router.navigate(['/read', chapter._id])
    this.updateReadingHistory(chapter)
    if (typeof window != 'undefined') {
      window.scrollTo(0, 0)
    }
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

  ngOnChanges() {
    this.ngOnInit()
  }

  ngOnInit() {
    this._edgeService.getEdgesFromNode(this.parentChapter.book, this.parentChapter._id).subscribe(edges => {
      const childrenIds = edges.map(edge => edge.target)
      let childrenLength = childrenIds.length
      const tmpChildren: Chapter[] = []
      this.children = []
      this.childrenPresented = []
      if (!childrenLength) {
        this.loaded = true
      } else {
        let counter = 0
        childrenIds.forEach(childId => {
          this._chapterService.getChapter(childId).subscribe(childChapter => {
            tmpChildren.push(childChapter)
            if (++counter >= childrenLength) {
              this.showChildren(tmpChildren)
            }
          }, err => {
            childrenLength--;
            if (++counter >= childrenLength) {
              this.showChildren(tmpChildren)
            }
          })
        })
      }
    })
  }

  showChildren(children: Chapter[]) {
    this.startChildIndex = -3
    this.endChildIndex = 0
    this.children = children
    this.nextChildren()

    this.loaded = true
  }


}
