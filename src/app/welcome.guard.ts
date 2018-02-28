import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service'

@Injectable()
export class WelcomeGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home'])
    }else{
      return true;
    }
  }
}
