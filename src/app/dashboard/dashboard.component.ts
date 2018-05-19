import { Component, OnInit } from '@angular/core';
import { AppStore } from '../app.store';
import { StatsService } from '../service/stats.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private players: UserModel[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    AppStore.usersProgress.subscribe(usersProgress => {
      this.players = usersProgress;
    });
  }

}
