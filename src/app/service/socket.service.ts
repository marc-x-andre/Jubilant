import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore, GAME_STATE } from '../app.store';
import { UserModel } from '../model/user.model';

@Injectable()
export class SocketService {
    private user: UserModel;

    constructor(private socket: Socket) {
        // For user auth in message
        AppStore.user.subscribe(user => {
            this.user = user;
        });

        // All players progress
        this.socket.fromEvent<any>('progress').subscribe(data => {
            AppStore.usersProgress.next(data);
        });
        // Time & game state 
        this.socket.fromEvent<any>('time').subscribe(data => {
            AppStore.isGame.next(data.is_game);
            AppStore.timerGame.next(data.game_time);

            if (AppStore.gameEntry.getValue() !== data.game_text) {
                AppStore.gameEntry.next(data.game_text);
                AppStore.userEntry.next('');
                AppStore.userProgress.next(0);
            }
        });

        // Chat Message
        this.socket.fromEvent<any>('message').subscribe(msg => {
            AppStore.chatMessage.getValue().push(JSON.parse(msg));
            AppStore.chatMessage.next(AppStore.chatMessage.getValue());
        });

    }

    sendUserProgress(progress: number) {
        this.socket.emit('progress', { username: this.user.username, progress: progress });
    }

    sendMessage(msg: string) {
        this.socket.emit('message', JSON.stringify({ username: this.user.username, message: msg }));
    }

    close() {
        this.socket.disconnect({username: this.user.username});
    }
}
