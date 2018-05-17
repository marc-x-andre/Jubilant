import { Component, OnInit } from '@angular/core';
import { UserStats } from '../model/user_stats';
import { StatsService } from '../service/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private usersStats: UserStats[];

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.statsService.getUsersStats().subscribe(usersStats => {
      this.usersStats = usersStats;
    });
  }

}
