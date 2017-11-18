import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from '../authentication.service'
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'wn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
        this.router.navigate(['/home'])
      },
      err => {
        this.openSnackBar('Login failed', 'OK')
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    })
  }

}
