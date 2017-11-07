import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {User} from '../../models/user'
import {ColorService} from '../color.service'

@Component({
  selector: 'wn-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  @Input() author: User
  @Output() reachedTop: EventEmitter<boolean> = new EventEmitter()

  color: string

  constructor(private _colorService: ColorService) {
  }

  ngOnInit() {
    this.color = this._colorService.getColorFromName(name)
  }

  getInitials() {
    const name = this.author.penName ? this.author.penName : this.author.fullName
    const names = name.split(' ')
    let initials = ''
    names.forEach(n => {
      initials += n.charAt(0)
    })
    return initials
  }

}
