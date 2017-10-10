import { Component, OnInit } from '@angular/core';
import {ChapterService} from "../chapter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chapter} from "../../models/chapter";
import {UserService} from "../user.service";
import {TagModel} from "ngx-chips/dist/modules/core";

@Component({
  selector: 'wn-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  parentChapter: Chapter;
  newChapter:Chapter = new Chapter();

  tags: any;
  loaded:boolean = false;

  constructor(private _chapterService:ChapterService, private route: ActivatedRoute, private router: Router, private _userService: UserService) { }

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
    this.addTagsToChapter();
    this.loaded = false;
    this.newChapter.author= this._userService.getCurrentUser()._id;
    this._chapterService.saveChapter(this.newChapter).subscribe((chapterId)=>{
      this._chapterService.addChildToChapter(this.parentChapter._id, chapterId).subscribe((response)=>{
        this.loaded = true;
        this.router.navigate(['read', chapterId]);
      });
    })
  }

  addTagsToChapter(){
    this.newChapter.tags = [];
    this.tags.forEach(tag =>{
      this.newChapter.tags.push(tag.value);
    })
  }

}
