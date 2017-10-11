import { Component, OnInit } from '@angular/core';
import {ChapterService} from "../chapter.service";
import {Chapter} from "../../models/chapter";

@Component({
  selector: 'wn-my-drafts',
  templateUrl: './my-drafts.component.html',
  styleUrls: ['./my-drafts.component.css']
})
export class MyDraftsComponent implements OnInit {

  myDrafts: Chapter[];

  constructor(private _chapterService: ChapterService) { }

  ngOnInit() {
    this._chapterService.getMyDrafts().subscribe(chapters=>{
      if(chapters){
        this.myDrafts = chapters;
      }else{
        this.myDrafts = [];
      }
    });
  }

}
