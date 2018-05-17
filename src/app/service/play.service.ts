import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore, GAME_STATE } from '../app.store';

@Injectable()
export class PlayService {

    private next_game_string;
    private game_life_time;

    constructor(private socket: Socket) {

    }

    hackerDetect() {

    }

    userEntry(user_answer: string) {
        let progress = 0;
        let state = GAME_STATE.PROGRESS;

        // Detect Error
        for (let i = 0; i < user_answer.length; i++) {
            progress = i;
            if (user_answer[i] !== AppStore.game_string.getValue()[i]) {
                state = GAME_STATE.ERROR;
                break;
            }
        }
        // Detect Finish
        if (user_answer.length === AppStore.game_string.getValue().length && state !== GAME_STATE.ERROR) {
            state = GAME_STATE.FINISH;
        }
        AppStore.STATE.emit(state);
    }

}
