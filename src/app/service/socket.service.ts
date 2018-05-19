import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore, GAME_STATE } from '../app.store';
import { StatsService } from './stats.service';

@Injectable()
export class SocketService {
    private user;

    constructor(private socket: Socket) {
        // All players progress
        this.socket.fromEvent<any>('progress').subscribe(data => {
            AppStore.usersProgress.next(data);
        });
        // Time & gem state 
        this.socket.fromEvent<any>('time').subscribe(data => {
            AppStore.isGame.next(data.is_game);
            AppStore.timerGame.next(data.game_time);
        });

        AppStore.user.subscribe(user => {
            this.user = user;
        });
    }

    sendUserProgress(progress: number) {
        this.socket.emit('progress', { username: this.user.username, progress: progress });
    }

}
