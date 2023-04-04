import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { FirestoreFirebaseService } from 'src/app/services/firestore-firebase.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  private userUID: string;
  private token;
  @Output() fullname!: string;
  constructor(
    private cookie: CookiesService,
    private router: Router,
    private firestoreService: FirestoreFirebaseService
  ) {
    this.token = this.cookie.getTokenCookie();
    this.userUID = this.token.uid;
    this.firestoreService.getFullname(this.userUID).then((data) => {
      this.fullname = String(data);
    });
  }
  ngOnInit(): void {
    if (this.router.url === '/administrator') {
      this.router.navigate(['/administrator/overview']);
    }
  }
}
