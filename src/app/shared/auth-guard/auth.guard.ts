import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.getLoggedInUser()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
