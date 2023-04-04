import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface Inavigation {
  path: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
  @Input() fullname!: string;
  logoPath: string;
  logoSrc: string;
  appTitle: string;
  logoutIcon: string;
  logoutPath: string;
  navLinks: Inavigation[];
  isTooltipDisabled = true;
  hamburgerMenuStatus: boolean = false;
  constructor(
    private cookieService: CookiesService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Small]).subscribe((result) => {
      this.isTooltipDisabled = !result.matches;
      this.hamburgerMenuStatus = !result.matches;
    });

    this.logoPath = 'overview';
    this.logoSrc = '../assets/icon/lamppost.png';
    this.appTitle = 'LAMPPOST';
    this.logoutIcon = 'logout';
    this.logoutPath = '/';
    this.navLinks = [
      {
        name: ' My Shifts',
        icon: 'work',
        path: 'shifts',
      },
      { name: 'Overview', icon: 'assessment', path: 'overview' },

      { name: 'Profile', icon: 'fingerprint', path: 'profile' },
    ];
  }
  openMobileMenu() {
    this.hamburgerMenuStatus = !this.hamburgerMenuStatus;
  }
  logoutCurrentUser() {
    this.cookieService.deleteCookie();
    this.router.navigate([`${this.logoutPath}`]);
  }
}
