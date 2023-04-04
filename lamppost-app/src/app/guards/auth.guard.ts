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
import { FirestoreFirebaseService } from '../services/firestore-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookiesService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      const token = this.cookieService.checkCookie();
      if (token) {
        resolve(true);
      } else {
        console.log('No token auth guard');
        this.router.navigate(['/']);
        resolve(false);
      }
    });
  }
}
