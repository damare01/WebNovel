import {Component, OnInit} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Chapter} from '../../models/chapter'
import {UserService} from '../user.service'
import {isString} from 'util'
import {NotificationService} from '../notification.service'
import {EdgeService} from '../edge.service'
import {Edge} from '../../models/edge'
import {MatSnackBar} from '@angular/material'
import {ReadingHistoryService} from "../reading-history.service";

@Component({
  selector: 'wn-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  parentChapter: Chapter
  newChapter: Chapter = new Chapter()

  tags: any = []
  loaded = false

  constructor(private _chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private _userService: UserService,
              private _notificationService: NotificationService,
              private _edgeService: EdgeService,
              private snackbar: MatSnackBar,
              private _readingHistoryService: ReadingHistoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const parentId = params['parentChapter']
      if (parentId) {
        this._chapterService.getChapter(parentId).subscribe(chapter => {
          this.parentChapter = chapter
          this.newChapter.parent = this.parentChapter._id
          this.newChapter.book = this.parentChapter.book
          this.loaded = true
        }, err => {
          this.loaded = true
        })
      } else {
        this.loaded = true
      }
    })
  }

  publishChapter() {
    this.saveChapter(false)
  }

  saveDraft() {
    this.saveChapter(true)
  }

  saveChapter(draft: boolean) {
    if (!this.newChapter.title || !this.newChapter.body) {
      this.snackbar.open('Please fill in all the fields', 'DISMISS', {
        duration: 3000
      })
      return
    }

    this.addTagsToChapter()
    this.loaded = false
    if (draft) {
      this.newChapter.published = false
    }
    this.newChapter.author = this._userService.getCurrentUserId()
    this._chapterService.saveChapter(this.newChapter).subscribe((chapterId) => {
      if (this.parentChapter) {
        const newEdge = new Edge()
        newEdge.bookId = this.parentChapter.book
        newEdge.source = this.parentChapter._id
        newEdge.target = chapterId
        this._edgeService.createEdge(newEdge).subscribe(() => {
          this.loaded = true
          if (draft) {
            this.router.navigate(['mychapters'])
          } else {
            this._notificationService.postChapterNotification(this.parentChapter._id, chapterId)
            this.updateReadingHistory(this.parentChapter.book, chapterId)
            this.router.navigate(['read', chapterId])
          }

        })
      } else {
        this.loaded = true;
        this.router.navigate(['mychapters'])
      }

    })
  }

  updateReadingHistory(bookId: string, newChapterId: string) {
    this._readingHistoryService.getMyBookReadingHistory(bookId).subscribe(rh => {
      if(rh.chapterIds){
        rh.chapterIds = rh.chapterIds.concat([newChapterId])
      }else{
        rh.bookId = this.parentChapter.book
        rh.chapterIds = [this.parentChapter._id, newChapterId]
      }
      this._readingHistoryService.saveReadingHistory(rh).subscribe()
    })
  }

  addTagsToChapter() {
    this.newChapter.tags = []
    this.tags.forEach(tag => {
      if (tag.value) {
        this.newChapter.tags.push(tag.value)
      } else if (isString(tag)) {
        this.newChapter.tags.push(tag)
      }
    })
  }

}
