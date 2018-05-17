import { Component } from '@angular/core';
import { AppStore } from './app.store';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, private appStore: AppStore) {

  }
}
