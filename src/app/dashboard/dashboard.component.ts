import { Component, OnInit } from '@angular/core';
import { AppStore } from '../app.store';
import { Stats } from '../model/stats.model';
import { StatsService } from '../service/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private usersStats: Stats[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    AppStore.usersProgress.subscribe(usersProgress => {
      this.usersStats = usersProgress;
    });
  }

}
