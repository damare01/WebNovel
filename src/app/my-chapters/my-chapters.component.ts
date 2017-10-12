import {Component, OnInit} from '@angular/core'
import {Chapter} from '../../models/chapter'
import {ChapterService} from '../chapter.service'

@Component({
  selector: 'wn-my-chapters',
  templateUrl: './my-chapters.component.html',
  styleUrls: ['./my-chapters.component.css']
})
export class MyChaptersComponent implements OnInit {

  myChapters: Chapter[]

  constructor(private _chapterService: ChapterService) {
  }

  ngOnInit() {
    this._chapterService.getMyChapters().subscribe(chapters => {
      this.myChapters = chapters
    })
  }

}
