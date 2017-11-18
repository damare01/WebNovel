import {Component, OnInit} from '@angular/core'
import {MatSnackBar} from '@angular/material'
import {UserService} from '../user.service'
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'wn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private _authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  showError() {
    this.snackBar.open('This doesn\'t work yet', ':(', {
      duration: 2000
    })
  }

  isLoggedIn() {
    return this._authService.isLoggedIn()
  }
}
