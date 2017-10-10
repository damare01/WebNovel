import {Component, OnInit} from '@angular/core';
import {ChapterService} from "../chapter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chapter} from "../../models/chapter";
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {LikeService} from "../like.service";

@Component({
  selector: 'wn-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  chapterId: string;
  chapter: Chapter;
  author: User;
  liked: boolean = false;
  disliked: boolean = false;

  numberOfLikes: number = 0;
  numberOfDislikes: number = 0;

  showGraph: boolean = true;

  constructor(private _chapterService: ChapterService,
              private route: ActivatedRoute,
              private router: Router,
              private _userService: UserService,
              private _likeService: LikeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.chapterId = params['chapterId'];
      this.getChapterAndAuthor(this.chapterId);
      this.getNumberOfLikes(this.chapterId);
      this.getMyLike(this.chapterId);
    })
  }

  getNumberOfLikes(chapterId: string) {
    this._likeService.getNumberOfChapterLikes(chapterId).subscribe(likeCount => {
      this.numberOfLikes = likeCount.likes;
    }, err => {
      //ignore
    });

    this._likeService.getNumberOfChapterDislikes(chapterId).subscribe(dislikeCount => {
      this.numberOfDislikes = dislikeCount.dislikes;
    }, err => {
      //ignore
    });
  }

  getMyLike(chapterId) {
    this._likeService.getMyChapterLike(chapterId).subscribe(like => {
      if (like.vote === 1) {
        this.liked = true;
        this.disliked = false;
      } else {
        this.disliked = true;
        this.liked = false;
      }
    }, err => {
      //ignore
    })
  }

  getChapterAndAuthor(chapterId: string) {
    this._chapterService.getChapter(this.chapterId).subscribe(chapter => {
      this.chapter = chapter;
      this.getUser(this.chapter.author);
    });
  }

  getUser(userId: string) {
    this._userService.getUser(userId).subscribe(user => {
        this.author = user;
      },
      err => {
        this.author = new User();
        this.author.penName = 'Unknown';
      });
  }

  writeChapter(parentChapter: string) {
    this.router.navigate(['write', parentChapter]);
  }

  like() {
    this.disliked = false;
    this.liked = true;
    this._likeService.likeChapter(this.chapterId).subscribe(res => {
      this.getNumberOfLikes(this.chapterId);
    }, err => {
      this.liked = false;
      console.log(err);
    });
  }

  dislike() {
    this.liked = false;
    this.disliked = true;
    this._likeService.dislikeChapter(this.chapterId).subscribe(res => {
      this.getNumberOfLikes(this.chapterId);
    }, err => {
      this.disliked = false;
    })
  }

  toggleGraph() {
    this.showGraph = !this.showGraph;
  }

}
