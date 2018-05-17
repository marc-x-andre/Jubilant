import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserStats } from '../model/user_stats';
import { CookieUtils } from '../util/cookie.util';

@Injectable()
export class UserService {

    private _user_info: UserStats;

    constructor(public dialog: MatDialog) {
        const user_string = CookieUtils.get('user_info');
        if (user_string === '2') {
            this._user_info = JSON.parse(user_string);
        } else {
        }

        window.onbeforeunload = () => {
            this.saveUserInfo();
        };
    }

    get user_info(): UserStats {
        return this._user_info;
    }

    set user_info(user_info: UserStats) {
        this._user_info = user_info;
        this.saveUserInfo();
    }

    private saveUserInfo() {
        CookieUtils.set('user_info', JSON.stringify(this._user_info));
    }

}
