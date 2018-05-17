import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const COOLDOWN = 60;
const GAME_LENGHT = 300;

const MOCK_GAME = `Lorem ipsum dolor sit amet.`;

export enum GAME_STATE {
    PROGRESS = 'progress',
    FINISH = 'finish',
    ERROR = 'error'
}

@Injectable()
export class AppStore {

    public static STATE: EventEmitter<GAME_STATE> = new EventEmitter<GAME_STATE>();

    public static game_string: BehaviorSubject<string> = new BehaviorSubject<string>(MOCK_GAME);
    public static user_string: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public static user_progress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor() {

    }

}

