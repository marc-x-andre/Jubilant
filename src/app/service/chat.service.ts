import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';
import { AppStore } from '../app.store';
import { Message } from '../model/message.model';

@Injectable()
export class ChatService {

    private user;

    private chat_msg: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

    constructor(private socket: Socket, private userService: UserService) {

        this.socket.fromEvent<any>('message').subscribe(msg => {
            this.chat_msg.getValue().push(JSON.parse(msg));
            this.chat_msg.next(this.chat_msg.getValue());
        });

        AppStore.user.subscribe(user => {
            this.user = user;
        });
    }

    sendMessage(msg: string) {
        this.socket.emit('message', JSON.stringify({ username: this.user.username, message: msg }));
    }

    getMessageObservable() {
        return this.chat_msg.asObservable();
    }

    close() {
        this.socket.disconnect();
    }

}
