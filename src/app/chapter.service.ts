import { Injectable } from '@angular/core';
import {WnHttp} from "./wnhttp.service";
import {Chapter} from "../models/chapter";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';

@Injectable()
export class ChapterService {

  constructor(private wnhttp: WnHttp) { }

  getChapters():Observable<Chapter[]> {
    return this.wnhttp.get('/chapters')
  }

  getChapter(id: string): Observable<Chapter>{
    return this.wnhttp.get("/chapters/id/" +id);
  }

  saveChapter(chapter: Chapter): Observable<Response>{
    return this.wnhttp.post('/chapters', chapter);
  }

}
