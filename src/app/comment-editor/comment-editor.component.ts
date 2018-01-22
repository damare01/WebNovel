import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {CommentService} from '../comment.service'
import {Comment} from '../../models/comment'
import {UserService} from '../user.service'
import {NotificationService} from '../notification.service'

@Component({
  selector: 'wn-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit {

  newComment: Comment = new Comment()
  text: any
  @Input() discussionId
  @Output() postedComment: EventEmitter<Comment> = new EventEmitter()

  @ViewChild('editor') editorDiv: ElementRef

  constructor(private _commentService: CommentService,
              private _userService: UserService,
              private _notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  postComment() {
    if(!this.text){
      return
    }
    this.newComment.text = this.text
    this.newComment.discussion_id = this.discussionId
    this._commentService.saveComment(this.newComment).subscribe(commentId => {
      this.newComment._id = commentId
      this.newComment.posted = new Date()
      this._userService.getCurrentUser().subscribe(user => {
        this.newComment.author = {
          id: user._id,
          penName: user.penName || user.fullName
        }
        this._notificationService.postCommentNotification(this.newComment)
        this.postedComment.emit(this.newComment)
        this.text = ''
        this.editorDiv.nativeElement.innerHTML = ''
        this.newComment = new Comment()
      })

    }, err => {
      // ignore
    })
  }

  updateText(text: any) {
    this.text = text
  }

}
