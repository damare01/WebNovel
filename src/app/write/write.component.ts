import { Component, OnInit } from '@angular/core';
import {ChapterService} from "../chapter.service";
import {ActivatedRoute} from "@angular/router";
import {Chapter} from "../../models/chapter";

@Component({
  selector: 'wn-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  parentChapter: Chapter;
  newChapter:Chapter = new Chapter();

  loaded:boolean = false;

  constructor(private _chapterService:ChapterService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      let parentId = params['parentChapter'];
      if(parentId){
        this._chapterService.getChapter(parentId).subscribe(chapter =>{
          this.parentChapter = chapter;
          this.newChapter.parent = this.parentChapter._id;
          this.newChapter.book = this.parentChapter.book;
          this.loaded = true;
        })
      }
    })
  }

  saveChapter(){
    this.newChapter.author='59c3995ddd8415653e5ebc87';//TODO Create userservice to get current user
    this._chapterService.saveChapter(this.newChapter).subscribe((chapterId)=>{
      this.parentChapter.childrenIds.push(chapterId);
      console.log('saved chapter');
      this._chapterService.updateChapter(this.parentChapter).subscribe((response)=>{
        console.log('added chapter to parent');
        console.log('everything went great');
      });
    })
  }

}
