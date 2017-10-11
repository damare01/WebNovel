import { Component, OnInit } from '@angular/core';
import {Chapter} from "../../models/chapter";
import {ChapterService} from "../chapter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isString} from "util";

@Component({
  selector: 'wn-edit-draft',
  templateUrl: './edit-draft.component.html',
  styleUrls: ['./edit-draft.component.css']
})
export class EditDraftComponent implements OnInit {

  draft: Chapter;
  tags: any = [];

  constructor(private _chapterService:ChapterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let chapterId = params['chapterId'];
      this._chapterService.getMyDraft(chapterId).subscribe(draft=>{
        this.draft = draft;
        if(draft.tags){
          this.tags = draft.tags;
        }
      })
    })
  }

  saveDraft(){
    this.addTagsToChapter()
    this._chapterService.updateChapter(this.draft).subscribe(oldChapter=>{
      this.router.navigate(['/mychapters'])
    })
  }

  publishChapter(){
    this.addTagsToChapter()
    this.draft.published = true;
    this._chapterService.updateChapter(this.draft).subscribe(oldChapter =>{
      this.router.navigate(['/read',this.draft._id])
    })
  }

  addTagsToChapter() {
    this.draft.tags = [];
    this.tags.forEach(tag => {
      if(tag.value){
        this.draft.tags.push(tag.value);
      }else if(isString(tag)){
        this.draft.tags.push(tag);
      }
    })
  }

}
