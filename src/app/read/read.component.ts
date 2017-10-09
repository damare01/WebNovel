import {Component, OnInit} from '@angular/core';
import {ChapterService} from "../chapter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chapter} from "../../models/chapter";
import {User} from "../../models/user";
import {UserService} from "../user.service";

@Component({
  selector: 'wn-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  chapterId: string;
  chapter: Chapter;
  author: User;

  showGraph: boolean = true;

  constructor(private _chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private _userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chapterId = params['chapterId'];
      this._chapterService.getChapter(this.chapterId).subscribe(chapter => {
        this.chapter = chapter;
        this._userService.getUser(this.chapter.author).subscribe(user => {
            this.author = user;
          },
          err => {
            this.author = new User();
            this.author.penName = 'Unknown';
          });
      });
    })
  }

  writeChapter(parentChapter: string) {
    this.router.navigate(['write', parentChapter]);
  }

  toggleGraph() {
    this.showGraph = !this.showGraph;
  }

}
