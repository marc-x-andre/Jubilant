import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { AppStore } from '../../app.store';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  @Input() public user: User;
  public isGame;
  public timer;

  private isLogin = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    AppStore.timerGame.pipe(switchMap(time => {
      this.timer = time;
      return AppStore.isGame;
    })).subscribe(isGame => this.isGame = isGame);
  }

  login() {
    this.userService.login().subscribe(isLogin => {
      if (isLogin) {
        this.toastr.success(`Your in... 🕵️‍`, 'Login');
      } else {
        this.toastr.error(`Sorry no more anonymous.`, 'Login');
      }
    });
  }

  logout() {
    this.userService.logout();
    this.toastr.info('You Are All Free Now!', 'Logout');
  }

}
