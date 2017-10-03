import { Component, OnInit } from '@angular/core';
import {ChapterService} from "../chapter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chapter} from "../../models/chapter";

@Component({
  selector: 'wn-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  chapterId:string;
  chapter: Chapter;

  constructor(private _chapterService: ChapterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.chapterId = params['chapterId'];
      this._chapterService.getChapter(this.chapterId).subscribe(chapter =>{
        this.chapter = chapter;
      });
      console.log(this.chapterId);
    })
  }

  writeChapter(parentChapter: string){
    this.router.navigate(['write', parentChapter]);
  }

}
