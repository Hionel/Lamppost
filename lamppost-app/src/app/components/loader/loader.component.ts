import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  loaderSrc: string = '../assets/loaderGif/Pulse-1.1s-197px.gif';
}
