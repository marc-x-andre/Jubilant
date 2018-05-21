import { Component, OnInit } from '@angular/core';
import { AppStore } from '../app.store';
import { Message } from '../model/message.model';
import { SocketService } from '../service/socket.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public msg_list: Message[] = [];
  public new_msg_count = -1;

  public is_hide = true;
  public is_collapse = false;

  constructor(private socketService: SocketService, private userService: UserService) {
    AppStore.user.subscribe(user => {
      if (user) {
        this.is_collapse = false;
      } else {
        this.is_collapse = true;
      }
    });
  }

  ngOnInit() {
    AppStore.chatMessage.subscribe(msg_list => {
      this.msg_list = msg_list;
      if (this.is_hide && this.new_msg_count < 10) {
        this.new_msg_count++;
      }
    });
  }

  onEnter(msg: string) {
    if (msg.length > 0) {
      this.socketService.sendMessage(msg);
    }
  }

  toggleChat() {
    this.is_hide = !this.is_hide;
    this.new_msg_count = 0;
  }

}
