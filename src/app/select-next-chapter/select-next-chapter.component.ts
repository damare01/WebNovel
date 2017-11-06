import {Component, Input, OnInit} from '@angular/core'
import {ChapterService} from '../chapter.service'
import {Chapter} from '../../models/chapter'

@Component({
  selector: 'wn-select-next-chapter',
  templateUrl: './select-next-chapter.component.html',
  styleUrls: ['./select-next-chapter.component.css']
})
export class SelectNextChapterComponent implements OnInit {

  @Input() chapterId: string
  children: Chapter[] = []

  constructor(private _chapterService: ChapterService) {
  }

  ngOnInit() {
    this._chapterService.getChapter(this.chapterId).subscribe(parentChapter => {
      let counter = 0
      const tmpChildren = []
      const childrenLength = parentChapter.childrenIds.length
      parentChapter.childrenIds.forEach(childId => {
        this._chapterService.getChapter(childId).subscribe(child => {
          tmpChildren.push(child)
          if (++counter >= childrenLength) {
            this.children = tmpChildren
          }
        })
      })
    })
  }

}
