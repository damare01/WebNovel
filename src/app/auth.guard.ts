import {Injectable} from '@angular/core'
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router'
import {Observable} from 'rxjs'
import {AuthenticationService} from './authentication.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private _authService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
    }
  }
}
