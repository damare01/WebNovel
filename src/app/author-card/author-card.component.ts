import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {User} from '../../models/user'

@Component({
  selector: 'wn-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  @Input() author: User
  @Output() reachedTop: EventEmitter<boolean> = new EventEmitter()

  color: string

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const colors = [
      '#e67e22',
      '#d35400',
      '#f39c12',
      '#34495e',
      '#2980b9',
      '#16a085'
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]
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
