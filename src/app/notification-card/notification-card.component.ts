import {Component, Input, OnInit} from '@angular/core'
import {Notification} from '../../models/notification'
import {UserService} from '../user.service'
import {User} from '../../models/user'

@Component({
  selector: 'wn-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {

  @Input() notification: Notification
  subjectUser: User = new User()
  actorUser: User = new User()


  constructor(private _userSerivice: UserService) {
  }

  ngOnInit() {
    if (!this.notification) {
      return
    }

    this._userSerivice.getUser(this.notification.subjectId).subscribe(subject => {
      this.subjectUser = subject
    })

    this._userSerivice.getUser(this.notification.actorId).subscribe(actor => {
      this.actorUser = actor
    })
  }

  getNotificationLink(): string {
    if (!this.notification) {
      return ''
    }
    if (this.notification.objectType === 'chapter') {
      return `/read/${this.notification.objectId}`
    }
  }

}
