import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {NotificationService} from '../notification.service'
import {Notification} from '../../models/notification'

@Component({
  selector: 'wn-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  @Input() notifications: Notification[]
  @Input() showLoadMore = true
  @Output('cardClick') cardClick: EventEmitter<boolean> = new EventEmitter()
  @Output('loadMore') loadMore: EventEmitter<boolean> = new EventEmitter()

  constructor() {
  }

  ngOnInit() {
  }

  emitCardClick() {
    this.cardClick.emit(true)
  }

  emitLoadMore() {
    this.loadMore.emit(true)
  }

}
