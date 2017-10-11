import {Component, Input, OnInit} from '@angular/core';
import {Chapter} from "../../models/chapter";
import {Book} from "../../models/book";
import {BookService} from "../book.service";
import {LikeService} from "../like.service";

@Component({
  selector: 'wn-chapter-grid',
  templateUrl: './chapter-grid.component.html',
  styleUrls: ['./chapter-grid.component.css']
})
export class ChapterGridComponent implements OnInit {

  @Input() chapters: Chapter[] = [];
  @Input() getLikes: boolean = true;
  @Input() editOnClick: boolean = false;
  chapterInfos: ChapterInfo[] = [];

  viewLoaded: boolean = false;

  bookMap: Map<string, Book> = new Map();

  constructor(private _bookService: BookService, private _likeService: LikeService) {
  }

  ngOnInit() {
    this.updateViewLoaded();
    let bookIds: Set<string> = new Set();
    this.chapters.forEach(chapter => {
      if (chapter.book) {
        bookIds.add(chapter.book);
      }
      let chapterInfo = new ChapterInfo();
      chapterInfo.chapter = chapter;
      if (this.getLikes) {
        this._likeService.getNumberOfChapterLikes(chapter._id).subscribe(likeCount => {
          chapterInfo.likes = likeCount.likes;
          this._likeService.getNumberOfChapterDislikes(chapter._id).subscribe(dislikeCount => {
            chapterInfo.dislikes = dislikeCount.dislikes;
            this.updateViewLoaded();
          });
        })
      }
      this.chapterInfos.push(chapterInfo);
    });
    this._bookService.getBooks(Array.from(bookIds)).subscribe(books => {
      books.forEach(book => {
        this.bookMap.set(book._id, book);
      });
    });


  }

  updateViewLoaded() {
    this.viewLoaded = this.chapterInfos.length === this.chapters.length || !this.getLikes;
  }

  getBookTitle(bookId: string) {
    let book = this.bookMap.get(bookId);
    if (book) {
      return book.title;
    }
    return 'Error';
  }

}

class ChapterInfo {
  chapter: Chapter;
  likes: number;
  dislikes: number;
}
