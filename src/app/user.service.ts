import { Injectable } from '@angular/core';
import {WnHttp} from "./wnhttp.service";
import {CurrentlyReading} from "../models/currentlyreading";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private _wnhttp: WnHttp) { }

  updateCurrentlyReading(currentlyReading: CurrentlyReading){
    return this._wnhttp.put('/users/currentlyreading', currentlyReading);
  }

  getCurrentlyReading(bookId: string):Observable<CurrentlyReading>{
    return this._wnhttp.get('/users/currentlyreading/' + bookId);
  }

}
