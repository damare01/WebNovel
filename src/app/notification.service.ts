import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs/Rx'
import {Notification} from '../models/notification'
import {Comment} from '../models/comment'
import {ChapterService} from './chapter.service'
import {UserService} from './user.service'

@Injectable()
export class NotificationService {

  constructor(private _wnhttp: WnHttp,
              private _chapterService: ChapterService,
              private _userService: UserService) {
  }

  getNewNotifications(): Observable<Notification[]> {
    return this._wnhttp.get('/notifications/new')
  }

  saveNotification(notification: Notification): Observable<string> {
    return this._wnhttp.post('/notifications', notification)
  }

  updateNotification(notification: Notification): Observable<Notification> {
    return this._wnhttp.put('/notifications', notification)
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

  postChapterNotification(oldChapterId: string, newChapterId: string) {
    const notification = new Notification()
    notification.verb = 'added a chapter to'
    notification.actorId = this._userService.getCurrentUserId()
    notification.objectType = 'chapter'
    notification.objectId = newChapterId
    this._chapterService.getChapter(oldChapterId).subscribe(chapter => {
      notification.subjectId = chapter.author
      this.saveNotification(notification).subscribe()
    })
  }

  postLikeNotification(chapterId: string, liked: boolean): void {
    const notification = new Notification()
    notification.verb = liked ? 'liked' : 'disliked'
    notification.actorId = this._userService.getCurrentUserId()
    notification.objectType = 'chapter'
    notification.objectId = chapterId
    this._chapterService.getChapter(chapterId).subscribe(chapter => {
      notification.subjectId = chapter.author

      this.saveNotification(notification).subscribe()
    })
  }

  readNotification(notification: Notification): void {
    const notificationClone = new Notification()
    notificationClone._id = notification._id
    notificationClone.read = true
    this.updateNotification(notificationClone).subscribe()
  }

  getContinousNewNotifications(): Observable<Notification[]> {
    return Observable
      .interval(0.5 * 60 * 1000)
      .flatMap(() => this.getNewNotifications())
  }
}
