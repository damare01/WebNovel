import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {CommentService} from '../comment.service'
import {Comment} from '../../models/comment'
import {AuthenticationService} from '../authentication.service'
import {UserService} from '../user.service'

@Component({
  selector: 'wn-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit {

  newComment: Comment = new Comment()
  @Input() discussionId
  @Output() postedComment: EventEmitter<Comment> = new EventEmitter()

  constructor(private _commentService: CommentService,
              private _userService: UserService) { }

  ngOnInit() {
  }

  postComment() {
    this.newComment.discussion_id = this.discussionId
    this._commentService.saveComment(this.newComment).subscribe(commentId => {
      this.newComment._id = commentId
      this.newComment.posted = new Date()
      const user = this._userService.getCurrentUser()
      this.newComment.author = {
        id: user._id,
        penName: user.penName || user.fullName
      }
      this.postedComment.emit(this.newComment)
      this.newComment = new Comment()
    }, err => {
      // ignore
    })
  }

  updateText(text: string) {
   this.newComment.text = text
  }

}
