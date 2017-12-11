import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs/Observable'
import {Edge} from '../models/edge'

@Injectable()
export class EdgeService {

  constructor(private _wnhttp: WnHttp) {
  }

  getBookEdges(bookId: string): Observable<Edge> {
    return this._wnhttp.get(`/edges/books/${bookId}`)
  }

}
