import {Component} from '@angular/core'
import {AuthenticationService} from './authentication.service'
import {User} from '../models/user'
import {UserService} from './user.service'

@Component({
  selector: 'wn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User = new User()

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user
    })
  }

  logout() {
    this.authenticationService.logout()
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn()
  }


}
