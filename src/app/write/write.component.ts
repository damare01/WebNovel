import {Component, OnInit} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Chapter} from '../../models/chapter'
import {UserService} from '../user.service'
import {TagModel} from 'ngx-chips/dist/modules/core'
import {isString} from 'util'

@Component({
  selector: 'wn-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  parentChapter: Chapter
  newChapter: Chapter = new Chapter()

  tags: any
  loaded = false

  constructor(private _chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private _userService: UserService) {
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
    this.addTagsToChapter()
    this.loaded = false
    if (draft) {
      this.newChapter.published = false
    }
    this.newChapter.author = this._userService.getCurrentUser()._id
    this._chapterService.saveChapter(this.newChapter).subscribe((chapterId) => {
      this._chapterService.addChildToChapter(this.parentChapter._id, chapterId).subscribe((response) => {
        this.loaded = true
        if (draft) {
          this.router.navigate(['mychapters'])
        } else {
          this.router.navigate(['read', chapterId])
        }
      })
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
