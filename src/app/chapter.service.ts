import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Chapter} from '../models/chapter'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import {Response} from '@angular/http'

@Injectable()
export class ChapterService {

  constructor(private wnhttp: WnHttp) {
  }

  getChapters(): Observable<Chapter[]> {
    return this.wnhttp.get('/chapters')
  }

  getChapter(id: string): Observable<Chapter> {
    return this.wnhttp.get('/chapters/id/' + id).map(chapter => {
      if (!chapter.children) {
        chapter.children = []
      }
      return chapter
    })
  }

  increaseViewsByOne(id: string): Observable<string> {
    return this.wnhttp.post(`/chapters/${id}/increaseviews`, {})
  }

  saveChapter(chapter: Chapter): Observable<string> {
    return this.wnhttp.post('/chapters', chapter)
  }

  updateChapter(chapter: Chapter): Observable<Chapter> {
    return this.wnhttp.put('/chapters', chapter)
  }

  addChildToChapter(chapterId: string, childId: string): Observable<Chapter> {
    return this.wnhttp.post(`/chapters/${chapterId}/child/${childId}`, {})
  }

  getMyDrafts(): Observable<Chapter[]> {
    return this.wnhttp.get('/chapters/drafts')
  }

  getMyDraft(chapterId: string): Observable<Chapter> {
    return this.wnhttp.get(`/chapters/drafts/${chapterId}`)
  }

  getMyChapters(): Observable<Chapter[]> {
    return this.wnhttp.get('/chapters/mychapters')
  }

  getUserChapters(userId: string): Observable<Chapter[]> {
    return this.wnhttp.get(`/users/${userId}/chapters`)
  }

  getBookChapters(bookId: string, includeBody?: boolean): Observable<Chapter[]> {
    let apiString = `/books/${bookId}/chapters`
    if (!includeBody) {
      apiString += '?body=false'
    }
    return this.wnhttp.get(apiString)
  }

  getMyUnusedChapters(): Observable<Chapter[]> {
    return this.wnhttp.get('/chapters/self/unused')
  }

}
