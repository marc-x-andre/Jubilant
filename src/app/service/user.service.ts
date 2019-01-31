import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppStore } from '../app.store';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private socket: Socket, ) { }

  public login(): Observable<boolean> {
    return this.http.get(`${environment.socket}/login`).pipe(switchMap(res => {
      if (res['data']) {
        AppStore.user.next(res['data']);
        return of(true);
      }
      return of(false);
    }));
  }

  /*
  * this.userSubject.next(undefined); Good Example ?
  */
  public logout() {
    AppStore.resetData();
    this.socket.emit('free', JSON.stringify({ username: AppStore.user.getValue().username }));
    AppStore.user.next(undefined);
    window.open('https://www.youtube.com/watch?v=_yYS0ZZdsnA', '_blank');
  }

}
