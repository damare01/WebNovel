import {Injectable, OnInit} from '@angular/core'
import * as io from 'socket.io-client'
import {UserService} from './user.service'
import {AuthenticationService} from './authentication.service'

@Injectable()
export class SocketService {

  private socket: any

  constructor(private _userService: UserService,
              private _authService: AuthenticationService) {
    this.socket = io()
    this.registerUser()
  }

  registerUser() {
    this.socket.on('connect', (socket) => {
      const tokenString = localStorage.getItem('currentUser')
      if (tokenString) {
        const token = JSON.parse(tokenString).token
        socket.emit('user-auth', token)
      }
    })

  }

  getSocket() {
    return this.socket
  }

}
