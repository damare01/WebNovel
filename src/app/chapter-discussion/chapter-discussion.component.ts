import {Component, Input, OnInit} from '@angular/core'
import {CommentService} from '../comment.service'
import {Comment} from '../../models/comment'

@Component({
  selector: 'wn-chapter-discussion',
  templateUrl: './chapter-discussion.component.html',
  styleUrls: ['./chapter-discussion.component.css']
})
export class ChapterDiscussionComponent implements OnInit {

  @Input() chapterId: string
  comments: Comment[] = []

  isExpanded = false

  constructor(private _commentService: CommentService) { }

  ngOnInit() {
    this._commentService.getDiscussionRootComments(this.chapterId).subscribe(comments =>{
      this.comments = comments
    })
  }

  addNewComment(comment: Comment) {
    this.comments = [comment].concat(this.comments)
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }

}
