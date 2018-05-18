import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private username = '';
  private password = '';

  private user;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getUserObservable().take(1).switchMap(user => {
      this.user = user;
      return this.route.params;
    }).subscribe(params => {
      const info = params['info'];
      if (info === 'out') {
        this.logout();
      } else if (this.user) {
        this.router.navigate(['/play']);
      }
    });
  }

  public login() {

    this.userService.userSubject.next({ username: 'Marc', isAdmin: false, id: 12 });
    /*
        this.userService.login(this.username, this.password).subscribe(isLogin => {
          if (isLogin) {
            this.router.navigate(['/play']);
          }
        });*/
  }

  public logout() {
    this.userService.logout();
  }

}
