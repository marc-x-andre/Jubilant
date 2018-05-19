import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './model/user.model';
import { Message } from './model/message.model';

export enum GAME_STATE {
    PROGRESS = 'progress',
    FINISH = 'finish',
    ERROR = 'error'
}

@Injectable()
export class AppStore {

    /**
     * Use to know the current state of the user game
     */
    public static gameState: EventEmitter<GAME_STATE> = new EventEmitter<GAME_STATE>();

    public static gameEntry: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public static userEntry: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public static userProgress: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public static isGame: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public static timerGame: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public static usersProgress: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);

    public static user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

    public static chatMessage: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

    constructor() { }

    public static resetData() {
        AppStore.userEntry.next('');
        AppStore.userProgress.next(0);
    }

}

