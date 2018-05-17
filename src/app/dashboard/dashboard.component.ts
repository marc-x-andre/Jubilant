import { Component, OnInit } from '@angular/core';
import { StatsService } from '../service/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private statsService: StatsService) { }

  ngOnInit() {}

}
