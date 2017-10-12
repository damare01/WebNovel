import {Component} from '@angular/core'
import {AuthenticationService} from './authentication.service'
import {User} from '../models/user'
import {UserService} from './user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser()
  }

  logout() {
    this.authenticationService.logout()
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn()
  }


}
