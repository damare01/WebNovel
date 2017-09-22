import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'wn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
        console.log(user);
        this.router.navigate(['home']);
      },
      err => {
        this.openSnackBar("Login failed", "OK");
      });
  }

  openSnackBar(message:string, action:string){
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }

}
