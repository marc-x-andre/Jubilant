import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/take';
import { AppStore, GAME_STATE } from '../app.store';
import { PlayService } from '../service/play.service';

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

  constructor(private playService: PlayService) { }

  ngOnInit() {
    AppStore.user_progress.subscribe(progress => this.progress = progress);

    AppStore.game_string.subscribe(game_string => this.game_string = game_string);
    AppStore.user_string.asObservable().take(1).subscribe(user_string => this.textarea.nativeElement.value = user_string);
    AppStore.STATE.subscribe(state => {
      this.state = state;
      if (this.state === GAME_STATE.FINISH) {
        this.textarea.nativeElement.disabled = true;
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
      }, 50);
      this.playService.hackerDetect();
    } else {
      this.control_entry = false;
    }
  }

  entryKey() {
    setTimeout(() => {
      this.playService.userEntry(this.textarea.nativeElement.value);
    }, 100);
  }

}
