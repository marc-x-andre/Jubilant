import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ChatMessage } from '../model/chat_entry';
import { ChatService } from '../service/chat.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  private msg_list: ChatMessage[] = [];
  private msg_sub: ISubscription;

  private is_hide = true;
  private is_collapse = false;

  constructor(private chatService: ChatService, private userService: UserService) {
    this.userService.getUserObservable().subscribe(user => {
      if (user) {
        this.is_collapse = false;
      } else {
        this.is_collapse = true;
      }
    });
  }

  ngOnInit() {
    this.msg_sub = this.chatService.getMessageObservable().subscribe(msg_list => this.msg_list = msg_list);
  }

  ngOnDestroy() {
    this.chatService.close();
    this.msg_sub.unsubscribe();
  }

  onEnter(msg: string) {
    this.chatService.sendMessage(msg);
  }

}
