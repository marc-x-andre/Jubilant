import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ChatMessage } from '../model/chat_entry';

@Injectable()
export class ChatService {

    private chat_msg: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

    constructor(private socket: Socket) {

        this.socket.fromEvent<any>('message').subscribe(msg => {
            this.chat_msg.getValue().push(JSON.parse(msg));
            this.chat_msg.next(this.chat_msg.getValue());
        });

    }

    sendMessage(msg: string) {
        this.socket.emit('message', JSON.stringify({ username: 'TEST', message: msg }));
    }

    getMessageObservable() {
        return this.chat_msg.asObservable();
    }

    close() {
        this.socket.disconnect();
    }

}