import { Component, OnInit } from '@angular/core';
import { AppStore } from '../../app.store';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public players: User[] = [];

  ngOnInit() {
    AppStore.usersProgress.subscribe(usersProgress => {
      this.players = usersProgress;
    });
  }

}
