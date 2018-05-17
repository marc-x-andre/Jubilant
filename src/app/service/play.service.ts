import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const COOLDOWN = 60;
const GAME_LENGHT = 300;

export enum GAME_STATE {
    PROGRESS = 'progress',
    FINISH = 'finish',
    ERROR = 'error'
}

@Injectable()
export class PlayService {

    public static STATE: EventEmitter<GAME_STATE> = new EventEmitter<GAME_STATE>();

    public game_string: BehaviorSubject<string> = new BehaviorSubject<string>(MOCK_GAME);
    public user_string: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public user_progress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private next_game_string;
    private game_life_time;

    constructor() {
    }

    hackerDetect() {

    }

    userEntry(user_answer: string) {
        let progress = 0;
        let state = GAME_STATE.PROGRESS;

        console.log(user_answer);
        console.log(this.game_string.getValue());

        // Detect Error
        for (let i = 0; i < user_answer.length; i++) {
            progress = i;
            if (user_answer[i] !== this.game_string.getValue()[i]) {
                state = GAME_STATE.ERROR;
                break;
            }
        }

        // Detect Finish
        if (user_answer.length === this.game_string.getValue().length && state !== GAME_STATE.ERROR) {
            state = GAME_STATE.FINISH;
        }

        PlayService.STATE.emit(state);
    }

}

const MOCK_GAME = `Lorem ipsum dolor sit amet.`;
