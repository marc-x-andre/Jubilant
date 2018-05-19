import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AppStore } from '../app.store';
import { UserService } from './user.service';
import { UserModel } from '../model/user.model';


@Injectable()
export class StatsService {

    private user: UserModel;

    constructor(private userService: UserService) {

        
    }

    

}

