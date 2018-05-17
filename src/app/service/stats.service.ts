import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { sample } from 'underscore';
import { UserStats } from '../model/user_stats';

@Injectable()
export class StatsService {

    private _usersStats = new BehaviorSubject<UserStats[]>(MOCK_USER);

    constructor() {
        setInterval(() => {
            this.increaseStats();
        }, 100);
    }

    getUsersStats(): Observable<UserStats[]> {
        return this._usersStats.asObservable();
    }

    increaseStats() {
        const u = sample(this._usersStats.getValue());

        if (u.progress <= 100) {
            u.progress += Math.floor(Math.random() * Math.floor(10));
        }
        if (u.progress > 100) {
            u.progress = 100;
        }
    }

}

const MOCK_USER: UserStats[] = [
    { id: 1, pseudo: 'Patate', progress: 100 },
    { id: 2, pseudo: 'Mouche', progress: 13 },
    { id: 3, pseudo: 'Agri', progress: 25 },
    { id: 4, pseudo: 'Ruelle', progress: 16 },
    { id: 5, pseudo: 'Beche', progress: 38 }
];
