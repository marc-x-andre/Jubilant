import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore } from '../app.store';
import { Stats } from '../model/stats.model';


@Injectable()
export class StatsService {

    constructor(private socket: Socket) {
        this.socket.fromEvent<any>('progress').subscribe(data => {
            this.computeProgress(JSON.parse(data));
        });
        this.socket.fromEvent<any>('time').subscribe(data => {
            // console.log(data);
            AppStore.is_game.next(data.is_game);
            AppStore.timer_game.next(data.game_time);
        });
    }

    sendProgress(progress: number) {
        this.socket.emit('progress', JSON.stringify({ username: 'TEST', progress: progress }));
    }

    /*
    *
    * Good example ?
    *
    */
    private computeProgress(data: Stats) {
        const userProgress: Stats = AppStore.usersProgress.getValue().find(entry => entry.username === data.username);

        if (userProgress) {
            userProgress.progress = data.progress;
        } else {
            AppStore.usersProgress.getValue().push(data);
        }
        AppStore.usersProgress.next(AppStore.usersProgress.getValue());
    }

}

