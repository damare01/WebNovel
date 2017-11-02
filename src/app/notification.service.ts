import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs/Observable'
import {Notification} from '../models/notification'
import {Comment} from '../models/comment'
import {ChapterService} from './chapter.service'

@Injectable()
export class NotificationService {

  constructor(private _wnhttp: WnHttp,
              private _chapterService: ChapterService) {
  }

  getNewNotifications(): Observable<Notification[]> {
    return this._wnhttp.get('/notifications/new')
  }

  saveNotification(notification: Notification): Observable<string> {
    console.log('posting that notification boii')
    return this._wnhttp.post('/notifications', notification)
  }

  getLatestNotifications(from: number, to: number): Observable<Notification[]> {
    return this._wnhttp.get(`/notifications/range/${from}/${to}`)
  }

  postCommentNotification(comment: Comment): void {
    const notification = new Notification()
    notification.verb = 'commented on'
    notification.actorId = comment.author.id
    notification.objectType = 'chapter'
    notification.objectId = comment.discussion_id
    this._chapterService.getChapter(comment.discussion_id).subscribe(chapter => {
      notification.subjectId = chapter.author

      this.saveNotification(notification).subscribe()
    })
  }
}
