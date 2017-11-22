import {Injectable} from '@angular/core'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {

  private socket: any

  constructor() {
    this.socket = io()
    this.socket.on('connect', (socket) => {
      this.registerUser()
    })
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
