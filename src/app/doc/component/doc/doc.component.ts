import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

  public documentations: Document[] = DOCUMENTATION_MOCK;

  constructor() { }

  ngOnInit() {
  }

}

const IMG_PATH = '../../assets/img/';

class Document {
  public title: string;
  public website: string;
  public img: string;
}

const DOCUMENTATION_MOCK: Document[] = [
  { title: `Angular 2-6`, website: `https://angular.io/`, img: `${IMG_PATH}ng.PNG` },
  { title: `Socket.io`, website: `https://socket.io/`, img: `${IMG_PATH}socket.PNG` },
  { title: `Bootstrap`, website: `https://getbootstrap.com/`, img: `${IMG_PATH}boot.PNG` },
  { title: `ReactiveX`, website: `http://reactivex.io/`, img: `${IMG_PATH}reactivex.PNG` },
  { title: `Express.js`, website: `https://expressjs.com/`, img: `${IMG_PATH}express.PNG` },
  { title: `Electron`, website: `https://electronjs.org/`, img: `${IMG_PATH}electron.PNG` },
  { title: `Rangle.io - Tutorial`, website: `https://angular-2-training-book.rangle.io/`, img: `${IMG_PATH}training.PNG` }
];
