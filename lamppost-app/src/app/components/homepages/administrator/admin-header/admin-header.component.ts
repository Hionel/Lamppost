import { Component, Input } from '@angular/core';

interface Inavigation {
  path: string;
  icon: string;
  name: string;
}

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
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
        name: 'Shifts',
        icon: 'work',
        path: 'shifts',
      },
      { name: 'Employees', icon: 'fingerprint', path: 'employees' },
    ];
  }
}
