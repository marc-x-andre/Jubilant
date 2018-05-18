import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Stats } from './model/stats.model';



const MOCK_GAME = `Lorem ipsum dolor sit amet.`;

export enum GAME_STATE {
    PROGRESS = 'progress',
    FINISH = 'finish',
    ERROR = 'error'
}

@Injectable()
export class AppStore {

    public static STATE: EventEmitter<GAME_STATE> = new EventEmitter<GAME_STATE>();

    public static gameEntry: BehaviorSubject<string> = new BehaviorSubject<string>(MOCK_GAME);
    public static userEntry: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public static userProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public static is_game: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public static timer_game: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public static isGameObservable: Observable<boolean> = AppStore.is_game.asObservable();
    public static timerGameObservable: Observable<number> = AppStore.timer_game.asObservable();

    public static usersProgress: BehaviorSubject<Stats[]> = new BehaviorSubject<Stats[]>([]);

    constructor() {

    }

}

