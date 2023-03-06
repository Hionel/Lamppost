import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StoredUser } from '../interfaces/stored-user';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookie: CookieService) {}
  setTokenCookie(token: StoredUser) {
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    const cryptedToken = crypto.AES.encrypt(
      JSON.stringify(token),
      'Very-secret-key'
    ).toString();

    this.cookie.set('token', cryptedToken, expires);
  }

  getTokenCookie() {
    const token = this.cookie.get('token');
    const decryptedToken = crypto.AES.decrypt(
      token,
      'Very-secret-key'
    ).toString(crypto.enc.Utf8);
    return JSON.parse(decryptedToken);
  }
  deleteCookie() {
    this.cookie.delete('token');
  }
  checkCookie() {
    return this.cookie.check('token');
  }
}
