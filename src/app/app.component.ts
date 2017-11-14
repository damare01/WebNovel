import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from './authentication.service'
import {User} from '../models/user'
import {UserService} from './user.service'
import * as io from 'socket.io-client'

@Component({
  selector: 'wn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User = new User()

  socket: any

  constructor(private authenticationService: AuthenticationService, private _userService: UserService) {

  }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe(user => {
      this.currentUser = user
    })

    this.socket = io()
    this.socket.on('notification', (data) => {
      console.log(data)
    })
  }

  logout() {
    this.authenticationService.logout()
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn()
  }


}
