import {Component, HostListener, Inject, OnInit} from '@angular/core'
import {AuthenticationService} from './authentication.service'
import {User} from '../models/user'
import {UserService} from './user.service'
import {SocketService} from './socket.service'
import {MatSnackBar} from '@angular/material'
import {ActivatedRoute, Router} from '@angular/router'
import {Badge} from '../models/badge'
import {BadgeService} from './badge.service'


@Component({
  selector: 'wn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User = new User()

  isOnWelcomePage = false
  transparentHeader = false

  socket: any

  constructor(private authenticationService: AuthenticationService,
              private _userService: UserService,
              private _socketService: SocketService,
              private snackBar: MatSnackBar,
              private router: Router,
              private _badgeService: BadgeService) {

  }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe(user => {
      this.currentUser = user
    })

    this.socket = this._socketService.getSocket()
    this.listenForBadges()
  }

  listenForBadges() {
    this.socket.on('badge', badgeId => {
      this._badgeService.getBadge(badgeId).subscribe(badge => {
        this.openBadgeSnackBar(badge)
      })
    })
  }

  openBadgeSnackBar(badge: Badge) {
    const snakcBarRef = this.snackBar.open(`Congratulations, you just received the ${badge.name} badge!`, 'Badges', {
      duration: 4000
    })
    snakcBarRef.onAction().subscribe(() => {
      this.router.navigate(['/user', this.currentUser._id])
    })
  }

  logout() {
    this.authenticationService.logout()
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn()
  }

}
