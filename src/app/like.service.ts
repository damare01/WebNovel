import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs'
import {Like} from '../models/like'
import {LikeCount} from '../models/likecount'
import {DislikeCount} from '../models/dislikecount'

@Injectable()
export class LikeService {

  constructor(private _wnhttp: WnHttp) {
  }

  likeChapter(chapterId: string): Observable<string> {
    return this._wnhttp.post(`/likes/chapter/${chapterId}/like`, {})
  }

  dislikeChapter(chapterId: string): Observable<string> {
    return this._wnhttp.post(`/likes/chapter/${chapterId}/dislike`, {})
  }

  getChapterLikes(chapterId: string): Observable<Like[]> {
    return this._wnhttp.get(`/likes/chapter/${chapterId}`)
  }

  getMyChapterLike(chapterId: string): Observable<Like> {
    return this._wnhttp.get(`/likes/chapter/${chapterId}/mylike`)
  }

  getNumberOfChapterLikes(chapterId: string): Observable<LikeCount> {
    return this._wnhttp.get(`/likes/chapter/${chapterId}/numberOfLikes`)
  }

  getNumberOfChapterDislikes(chapterId: string): Observable<DislikeCount> {
    return this._wnhttp.get(`/likes/chapter/${chapterId}/numberOfDislikes`)
  }

}
