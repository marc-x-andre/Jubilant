import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { AppStore } from '../app.store';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isGame;
  private timer;

  private isLogin = false;

  constructor(private userService: UserService) { }

  ngOnInit() {

    AppStore.timerGame.switchMap(time => {
      this.timer = time;
      return AppStore.isGame;
    }).subscribe(isGame => this.isGame = isGame);

    AppStore.user.subscribe(user => {
      this.isLogin = (user) ? true : false;
    });
  }

}
