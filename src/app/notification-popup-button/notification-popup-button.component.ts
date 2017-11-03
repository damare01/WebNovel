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

  numberOfUnreadNotifications: number

  constructor(private _notificationService: NotificationService) {
  }

  ngOnInit() {
    this._notificationService.getLatestNotifications(0, 10).subscribe(notifications => {
      this.notifications = notifications
      this.numberOfUnreadNotifications = this.notifications.filter(not => !not.read).length
    })

    this.subscribeToNewNotifications()
  }

  subscribeToNewNotifications() {
    this._notificationService.getContinousNewNotifications().subscribe(newNotifications => {
      if (newNotifications.length) {
        this.numberOfUnreadNotifications = newNotifications.length
        this._notificationService.getLatestNotifications(newNotifications.length, 10 - newNotifications.length)
          .subscribe(readNotifications => {
            this.notifications = newNotifications.concat(readNotifications)
          })
      }
    })
  }

  toggleShowNotifications() {
    this.showNotifications = !this.showNotifications
    this.numberOfUnreadNotifications = 0
    this.notifications.forEach(notification => {
      if (!notification.read) {
        this._notificationService.readNotification(notification)
      }
    })
  }

}
