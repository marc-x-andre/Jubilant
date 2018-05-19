import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/take';
import { AppStore, GAME_STATE } from '../app.store';
import { PlayService } from '../service/play.service';
import { StatsService } from '../service/stats.service';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  @ViewChild('textarea') private textarea: ElementRef;
  private is_started = true;
  private game_string;
  private control_entry;
  private state;
  private progress = 12;
  private timer;
  private isGame;

  constructor(private playService: PlayService, private socketService: SocketService, private toastr: ToastrService) { }

  ngOnInit() {
    AppStore.userProgress.subscribe(progress => this.progress = progress);
    AppStore.gameEntry.subscribe(game_string => this.game_string = game_string);
    AppStore.userEntry.asObservable().take(1).subscribe(user_string => this.textarea.nativeElement.value = user_string);

    AppStore.gameState.subscribe(state => {
      this.state = state;
      if (this.state === GAME_STATE.FINISH) {
        this.textarea.nativeElement.disabled = true;
        setTimeout(() => {
          AppStore.userProgress.next(100);
          this.socketService.sendUserProgress(100);
          this.toastr.success('You won !!!!', 'Congratulations...');
        }, 100);
      }
    });

    AppStore.timerGame.switchMap(time => {
      this.timer = time;
      return AppStore.isGame;
    }).subscribe(isGame => {
      this.isGame = isGame;
      if (isGame) {
        this.textarea.nativeElement.disabled = true;
      } else {
        this.textarea.nativeElement.disabled = false;
      }
    });

  }

  @HostListener('document:keydown', ['$event'])
  detectCRTLV(event: KeyboardEvent) {
    if (event.keyCode === 17) {
      this.control_entry = true;
    } else if (event.keyCode === 86 && this.control_entry) {
      setTimeout(() => {
        this.textarea.nativeElement.value = '';
      }, 100);
      this.textarea.nativeElement.disabled = true;
      this.playService.hackerDetect();
      this.toastr.warning('DON\'T');
    } else {
      this.control_entry = false;
    }
  }

  entryKey() {
    setTimeout(() => {
      this.playService.userEntry(this.textarea.nativeElement.value);
      AppStore.userEntry.next(this.textarea.nativeElement.value);
    }, 100);
  }

}
