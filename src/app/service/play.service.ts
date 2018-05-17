import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore, GAME_STATE } from '../app.store';

@Injectable()
export class PlayService {

    private next_game_string;
    private game_life_time;
    private is_game;
    private timer;

    constructor(private socket: Socket) {
        AppStore.timerGameObservable.switchMap(timer => {
            this.timer = timer;
            return AppStore.isGameObservable;
        }).subscribe(is_game => this.is_game = is_game);
    }

    hackerDetect() {

    }

    userEntry(user_answer: string) {
        let goodChar = 0;
        let state = GAME_STATE.PROGRESS;

        // Detect Error
        for (let i = 0; i < user_answer.length; i++) {
            goodChar = i;
            if (user_answer[i] !== AppStore.game_string.getValue()[i]) {
                state = GAME_STATE.ERROR;
                goodChar++;
                break;
            }
        }
        // Detect Finish
        if (user_answer.length === AppStore.game_string.getValue().length && state !== GAME_STATE.ERROR) {
            state = GAME_STATE.FINISH;
        }
        AppStore.STATE.emit(state);
        this.computeProgress(goodChar);
    }

    computeProgress(goodChar: number) {
        const progress = (100 * goodChar) / AppStore.game_string.getValue().length;
        AppStore.user_progress.next(Math.floor(progress));
        this.socket.emit('progress', JSON.stringify({ username: 'TEST', message: progress }));
    }

}
