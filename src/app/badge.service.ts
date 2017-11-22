import {Injectable} from '@angular/core'
import {WnHttp} from './wnhttp.service'
import {Badge} from '../models/badge'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class BadgeService {

  constructor(private _wnhttp: WnHttp) {
  }

  getUserBadges(userId: string): Observable<Badge[]> {
    return this._wnhttp.get(`/users/${userId}/badges/`)
  }

  getBadge(badgeId: string): Observable<Badge>{
    return this._wnhttp.get(`/badges/${badgeId}`)
  }

}
