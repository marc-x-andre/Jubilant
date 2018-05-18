import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private userService: UserService) { }

  ngOnInit() { }

  public login() {
    this.userService.login(this.username, this.password);
  }

}
