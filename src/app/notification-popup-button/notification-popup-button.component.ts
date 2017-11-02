import {Component, OnInit} from '@angular/core'
import {NotificationService} from '../notification.service'
import {Notification} from '../../models/notification'

@Component({
  selector: 'wn-notification-popup-button',
  templateUrl: './notification-popup-button.component.html',
  styleUrls: ['./notification-popup-button.component.css']
})
export class NotificationPopupButtonComponent implements OnInit {

  notifications: Notification[]
  showNotifications: boolean

  constructor(private _notificationService: NotificationService) {
  }

  ngOnInit() {
    this._notificationService.getLatestNotifications(0, 10).subscribe(notifications => {
      this.notifications = notifications
    })
  }

  toggleShowNotifications() {
    this.showNotifications = !this.showNotifications
  }

}
