import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {ReadingHistory} from '../models/readinghistory'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class ReadingHistoryService {

  constructor(private _wnhttp: WnHttp) {
  }

  getMyReadingHistory(): Observable<ReadingHistory[]> {
    return this._wnhttp.get('/users/self/readinghistory')
  }

  saveReadingHistory(readingHistory: ReadingHistory): Observable<ReadingHistory> {
    return this._wnhttp.put('/users/self/readinghistory/', readingHistory)
  }

  getMyBookReadingHistory(bookId: string): Observable<ReadingHistory> {
    return this._wnhttp.get(`/users/self/readinghistory/${bookId}`)
  }

}
