import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { AppStore } from '../app.store';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input() public user: UserModel;
  public isGame;
  public timer;

  private isLogin = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    AppStore.timerGame.switchMap(time => {
      this.timer = time;
      return AppStore.isGame;
    }).subscribe(isGame => this.isGame = isGame);
  }

  login() {
    this.userService.login().subscribe();
  }

  logout() {
    this.userService.logout();
  }

}
