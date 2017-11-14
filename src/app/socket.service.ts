import {Injectable, OnInit} from '@angular/core'
import * as io from 'socket.io-client'
import {UserService} from './user.service'

@Injectable()
export class SocketService {

  private socket: any

  constructor(private _userService: UserService) {
    this.socket = io()
    this._userService.getCurrentUser().subscribe(user => {
      this.socket.emit('user', user)
    })
  }

  getSocket() {
    return this.socket
  }

}
