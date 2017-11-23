import {Component, Input, OnInit} from '@angular/core'
import {CommentService} from '../comment.service'
import {Comment} from '../../models/comment'
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'wn-chapter-discussion',
  templateUrl: './chapter-discussion.component.html',
  styleUrls: ['./chapter-discussion.component.css']
})
export class ChapterDiscussionComponent implements OnInit {

  @Input() chapterId: string
  comments: Comment[] = []
  commentsLoaded = false

  isExpanded = false

  constructor(private _commentService: CommentService,
              private _authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  addNewComment(comment: Comment) {
    this.comments = [comment].concat(this.comments)
  }

  toggleExpand() {
    this._commentService.getDiscussionRootComments(this.chapterId).subscribe(comments => {
      this.comments = comments
      this.commentsLoaded = true
    })
    this.isExpanded = !this.isExpanded
  }

  isLoggedIn() {
    return this._authService.isLoggedIn()
  }

}
