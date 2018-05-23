import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { ToastrService } from 'ngx-toastr';
import { AppStore } from '../app.store';
import { UserModel } from '../model/user.model';

@Injectable()
export class SocketService {
    private user: UserModel;

    constructor(private socket: Socket, private toastr: ToastrService) {
        // For user auth in message
        AppStore.user.subscribe(user => {
            this.user = user;
        });

        this.addSocketListener();

        window.onbeforeunload = () => {
            this.close();
        };
    }

    addSocketListener() {
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
            AppStore.chatMessage.getValue().push(msg);
            AppStore.chatMessage.next(AppStore.chatMessage.getValue());
        });

        // New players
        this.socket.fromEvent<any>('new_player').subscribe((player: UserModel) => {
            setTimeout(() => {
                if (!this.user || this.user.username !== player.username) {
                    this.toastr.info(`${player.username}`, 'New challenger approaching.');
                }
            }, 100);
        });

        // Chat Message
        this.socket.fromEvent<any>('omg').subscribe(ink => {
            window.open(`${ink}`, '_blank');
        });
    }

    sendUserProgress(progress: number) {
        this.socket.emit('progress', { username: this.user.username, progress: progress });
    }

    sendMessage(msg: string) {
        this.socket.emit('message', { username: this.user.username, message: msg });
    }

    close() {
        this.socket.emit('free', this.user);
        this.socket.disconnect({ username: this.user.username });
    }
}
