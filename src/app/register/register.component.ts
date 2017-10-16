import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '../authentication.service'
import {MdSnackBar} from '@angular/material'
import {Router} from '@angular/router'

@Component({
  selector: 'wn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string
  password: string
  fullName: string
  penName: string

  captchaResponse: string

  constructor(private _authenticationService: AuthenticationService, private snackBar: MdSnackBar, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this._authenticationService.register(this.email, this.password, this.fullName, this.penName, this.captchaResponse).subscribe(res => {
        this.router.navigate(['/home'])
      },
      err => {
        console.log('error')
        console.log(err)
        const errMsg = JSON.parse(err._body).error
        console.log(errMsg)
        this.openSnackBar(errMsg, 'OK')
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message || 'There was an error when trying to register...', action, {
      duration: 4000
    })
  }

  handleCaptcha(response: any) {
    this.captchaResponse = response
  }
}
