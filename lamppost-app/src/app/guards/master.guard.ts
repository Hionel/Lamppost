import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class MasterGuard implements CanActivate {
  constructor(private cookiesSerivce: CookiesService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      const token = this.cookiesSerivce.getTokenCookie();
      if (token.adminAccount) {
        resolve(true);
      } else {
        this.router.navigate(['/homepage']);
        resolve(false);
      }
    });
  }
}
