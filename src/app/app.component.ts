import { Component } from '@angular/core';
import { AppStore } from './app.store';
import { UserModel } from './model/user.model';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private user: UserModel;

  constructor() {
    AppStore.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }
}
