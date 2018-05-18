import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { AppStore } from '../app.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isGame;
  private timer;

  constructor() { }

  ngOnInit() {

    AppStore.timerGameObservable.switchMap(time => {
      this.timer = time;
      console.log(time);
      return AppStore.isGameObservable;
    }).subscribe(isGame => this.isGame = isGame);

  }

}
