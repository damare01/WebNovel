import {Injectable, OnInit} from '@angular/core'
import * as io from 'socket.io-client'
import {UserService} from './user.service'

@Injectable()
export class SocketService {

  private socket: any

  constructor(private _userService: UserService) {
    this.socket = io()
    this.registerUser()
  }

  registerUser() {
    const tokenString = localStorage.getItem('currentUser')
    if (tokenString) {
      const token = JSON.parse(tokenString).token
      this.socket.emit('user-auth', token)
    }
  }

  getSocket() {
    return this.socket
  }

}
