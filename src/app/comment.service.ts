import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs'
import {Comment} from '../models/comment'

@Injectable()
export class CommentService {

  constructor(private _wnhttp: WnHttp) {
  }

  getComment(id: string): Observable<Comment> {
    return this._wnhttp.get(`/comments/${id}`)
  }

  getDiscussion(id: string): Observable<Comment[]> {
    return this._wnhttp.get(`/comments/discussions/${id}`)
  }

  saveComment(comment: Comment): Observable<string> {
    return this._wnhttp.post('/comments', comment)
  }

  getDiscussionRootComments(discussionId: string): Observable<Comment[]> {
    return this._wnhttp.get(`/comments/discussions/${discussionId}/rootcomments`)
  }

  getCommentChildren(commentId: string): Observable<Comment[]> {
    return this._wnhttp.get(`/comments/${commentId}/children`)
  }

}
