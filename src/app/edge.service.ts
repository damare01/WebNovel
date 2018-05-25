import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Observable} from 'rxjs'
import {Edge} from '../models/edge'

@Injectable()
export class EdgeService {

  constructor(private _wnhttp: WnHttp) {
  }

  getBookEdges(bookId: string): Observable<Edge[]> {
    return this._wnhttp.get(`/edges/books/${bookId}`)
  }

  getEdgesFromNode(bookId: string, sourceNodeId: string): Observable<Edge[]> {
    return this._wnhttp.get(`/edges/books/${bookId}/from/${sourceNodeId}`)
  }

  getEdgesToNode(bookId: string, targetNodeId: string): Observable<Edge[]> {
    return this._wnhttp.get(`/edges/books/${bookId}/to/${targetNodeId}`)
  }

  createEdge(newEdge: Edge): Observable<Edge> {
    return this._wnhttp.put(`/edges/`, newEdge)
  }
}
