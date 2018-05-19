import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore } from '../app.store';
import { Stats } from '../model/stats.model';
import { UserService } from './user.service';


@Injectable()
export class StatsService {

    private user;

    constructor(private socket: Socket, private userService: UserService) {
        this.socket.fromEvent<any>('progress').subscribe(data => {
            this.computeProgress(JSON.parse(data));
        });
        this.socket.fromEvent<any>('time').subscribe(data => {
            // console.log(data.game_time);
            AppStore.isGame.next(data.is_game);
            AppStore.timerGame.next(data.game_time);
        });

        AppStore.user.subscribe(user => {
            this.user = user;
        });
    }

    sendProgress(progress: number) {
        this.socket.emit('progress', JSON.stringify({ username: this.user.username, progress: progress }));
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

