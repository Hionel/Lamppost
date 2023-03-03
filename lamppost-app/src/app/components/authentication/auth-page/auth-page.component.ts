import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements AfterContentChecked, OnInit {
  constructor(private router: Router) {}
  appTitle: string = 'LAMPPOST';
  authFormTitle!: string;
  routerLink?: string;
  routerButtonText?: string;
  routerButtonIcon?: string;
  ngOnInit(): void {}
  ngAfterContentChecked(): void {
    switch (this.router.url) {
      case '/authentication/administrator-signup':
        this.authFormTitle = 'Administrator Register';
        this.routerLink = '/authentication/login';
        this.routerButtonText = 'Login';
        this.routerButtonIcon = 'login';
        break;
      case '/authentication/login':
        this.authFormTitle = 'Login';
        this.routerLink = '/authentication/register';
        this.routerButtonText = 'Not an user ?';
        this.routerButtonIcon = 'add';
        break;
      case '/authentication/register':
        this.authFormTitle = 'Registration';
        this.routerLink = '/authentication/login';
        this.routerButtonText = 'Login';
        this.routerButtonIcon = 'login';
        break;
      case '/authentication':
        this.authFormTitle = 'Authentication';
        this.routerLink = '/authentication/login';
        this.routerButtonText = 'Login';
        this.routerButtonIcon = 'login';
        break;
      default:
        this.authFormTitle = 'Authentication';
    }
  }
}
