import {Component, Input, OnInit} from '@angular/core'
import {Comment} from '../../models/comment'

@Component({
  selector: 'wn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment = new Comment()

  constructor() {
  }

  ngOnInit() {
  }

}
