import {Component, Input, OnInit} from '@angular/core'
import {BadgeService} from '../badge.service'
import {Badge} from '../../models/badge'

@Component({
  selector: 'wn-user-badges',
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.css']
})
export class UserBadgesComponent implements OnInit {

  @Input() userId: string

  badges: Badge[]

  constructor(private _badgeService: BadgeService) {
  }

  ngOnInit() {
    this._badgeService.getUserBadges(this.userId).subscribe(badges => {
      this.badges = badges
    })
  }

}
