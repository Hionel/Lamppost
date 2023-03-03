import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-image',
  templateUrl: './auth-image.component.html',
  styleUrls: ['./auth-image.component.scss'],
})
export class AuthImageComponent {
  imageSrc: string = '../assets/icon/lamppost.png';
}
