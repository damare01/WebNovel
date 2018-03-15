import {Component, OnInit} from '@angular/core'
import {Chapter} from '../../models/chapter'
import {ChapterService} from '../chapter.service'
import {ActivatedRoute, Router} from '@angular/router'
import {isString} from 'util'
import {NotificationService} from '../notification.service'
import {BookService} from '../book.service'
import {EdgeService} from '../edge.service'
import {Edge} from '../../models/edge'

@Component({
  selector: 'wn-edit-draft',
  templateUrl: './edit-draft.component.html',
  styleUrls: ['./edit-draft.component.css']
})
export class EditDraftComponent implements OnInit {

  draft: Chapter
  bookTitle: string = ''
  parentChapter: Chapter = new Chapter()
  tags: any = []

  constructor(private _chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private _notificationService: NotificationService,
              private _bookService: BookService,
              private _edgeService: EdgeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const chapterId = params['chapterId']
      this._chapterService.getMyDraft(chapterId).subscribe(draft => {
        this.draft = draft
        if (draft.tags) {
          this.tags = draft.tags
        }
        if (draft.book) {
          this._bookService.getBook(draft.book).subscribe(book => {
            this.bookTitle = book.title
          })
          this._edgeService.getEdgesToNode(draft.book, draft._id).subscribe(edges => {
            if (edges.length) {
              let edge = edges[0]
              this._chapterService.getChapter(edge.source).subscribe(chapter => {
                this.parentChapter = chapter
              })
            }
          })
        }
      })
    })
  }

  saveDraft() {
    this.addTagsToChapter()
    this._chapterService.updateChapter(this.draft).subscribe(oldChapter => {
      this.router.navigate(['/mychapters'])
    })
  }

  publishChapter() {
    this.addTagsToChapter()
    this.draft.published = true
    this._chapterService.updateChapter(this.draft).subscribe(oldChapter => {
      this._notificationService.postChapterNotification(oldChapter.parent, this.draft._id)
      this.router.navigate(['/read', this.draft._id])
    })
  }

  addTagsToChapter() {
    this.draft.tags = []
    this.tags.forEach(tag => {
      if (tag.value) {
        this.draft.tags.push(tag.value)
      } else if (isString(tag)) {
        this.draft.tags.push(tag)
      }
    })
  }

}
