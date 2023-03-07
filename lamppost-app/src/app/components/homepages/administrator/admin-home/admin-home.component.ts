import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StoredUser } from 'src/app/interfaces/stored-user';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  private userData: StoredUser;
  @Output() fullname: string;
  constructor(private cookie: CookiesService, private router: Router) {
    this.userData = this.cookie.getTokenCookie();
    this.fullname = this.userData.firstname + ' ' + this.userData.lastname;
  }
  ngOnInit(): void {
    if (this.router.url === '/administrator') {
      this.router.navigate(['/administrator/overview']);
    }
  }
}
