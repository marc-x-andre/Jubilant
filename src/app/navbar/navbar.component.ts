import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { AppStore } from '../app.store';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: UserModel;
  
  private isGame;
  private timer;

  private isLogin = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    AppStore.timerGame.switchMap(time => {
      this.timer = time;
      return AppStore.isGame;
    }).subscribe(isGame => this.isGame = isGame);
  }

}
