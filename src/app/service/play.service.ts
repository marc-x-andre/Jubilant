import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore, GAME_STATE } from '../app.store';
import { SocketService } from './socket.service';

@Injectable()
export class PlayService {

    private is_game;
    private timer;

    constructor(private socketService: SocketService) {
        AppStore.timerGame.switchMap(timer => {
            this.timer = timer;
            return AppStore.isGame;
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
            if (user_answer[i] !== AppStore.gameEntry.getValue()[i]) {
                state = GAME_STATE.ERROR;
                goodChar++;
                break;
            }
        }
        // Detect Finish
        if (user_answer.length === AppStore.gameEntry.getValue().length && state !== GAME_STATE.ERROR) {
            state = GAME_STATE.FINISH;
        }
        AppStore.gameState.emit(state);
        this.computeProgress(goodChar);
    }

    computeProgress(goodChar: number) {
        const progress = Math.floor((100 * goodChar) / AppStore.gameEntry.getValue().length);
        AppStore.userProgress.next(progress);
        this.socketService.sendUserProgress(progress);
    }

}
