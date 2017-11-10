import {Component, OnInit} from '@angular/core'
import {User} from '../../models/user'
import {UserService} from '../user.service'
import {AuthenticationService} from '../authentication.service'
import {MdSnackBar} from '@angular/material'

@Component({
  selector: 'wn-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  user: User = new User()

  editFullName = false
  editPenName = false

  oldPass: string
  newPass: string
  confirmPass: string

  constructor(private _userService: UserService,
              private _authService: AuthenticationService,
              private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe(user => {
      this.user = user
    })
  }

  updateUser() {
    this._userService.updateUser(this.user).subscribe(oldUser => {
    })
  }

  updateFullName() {
    this.updateUser()
    this.editFullName = false
  }

  updatePenName() {
    this.updateUser()
    this.editPenName = false
  }

  updatePassword() {
    this._userService.updatePassword(this.oldPass, this.newPass).subscribe(user => {
      this.oldPass = ''
      this.newPass = ''
      this.confirmPass = ''
      this.snackBar.open('Password successfully updated', 'OK', {
        duration: 3000
      })
    }, err => {
       this.snackBar.open('There was an error when trying to update you password...', 'OK', {
        duration: 3000
      })
    })
  }

}
