import { Component, Input } from '@angular/core';
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
  constructor() {
    this.logoPath = 'overview';
    this.logoSrc = '../assets/icon/lamppost.png';
    this.appTitle = 'LAMPPOST';
    this.logoutIcon = 'logout';
    this.logoutPath = '/';
    this.navLinks = [
      {
        name: ' My-Shifts',
        icon: 'work',
        path: 'shifts',
      },
      { name: 'Profile', icon: 'fingerprint', path: 'profile' },
    ];
  }
}
