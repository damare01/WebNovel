import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../user.service";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'wn-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  currentUser: User;

  constructor(private _userService: UserService, private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.currentUser = this._userService.getCurrentUser();
  }

  logout(){
    this._authenticationService.logout();
  }
}
