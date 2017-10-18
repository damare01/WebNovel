import {Component, Input, OnInit} from '@angular/core'
import {Comment} from '../../models/comment'

@Component({
  selector: 'wn-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  @Input() comments: Comment[]

  constructor() { }

  ngOnInit() {
    // this.generateDummyData()
  }


  generateDummyData() {
    const dummyComment1 = new Comment()
    dummyComment1.author = {
      penName: 'Max',
      id: ''
    }
    dummyComment1.posted = new Date()
    dummyComment1.text = 'Great chapter!'

    const dummyComment2 = new Comment()
    dummyComment2.author = {
      penName: 'Lisa',
      id: ''
    }
    dummyComment2.posted = new Date()
    dummyComment2.text = 'This chapter sucked!'

    this.comments = [
      dummyComment1,
      dummyComment2
    ]
  }

}
