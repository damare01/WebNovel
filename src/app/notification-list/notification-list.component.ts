import {Component, Input, OnInit} from '@angular/core'
import {NotificationService} from '../notification.service'
import {Notification} from '../../models/notification'

@Component({
  selector: 'wn-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  @Input() notifications: Notification[]

  constructor() {
  }

  ngOnInit() {
  }

}
