import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { AppStore } from '../app.store';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private socket: Socket, private toastr: ToastrService) { }

  public login(): Observable<boolean> {

    return this.http.get(`${environment.socket}/login`).switchMap(res => {
      console.log(res);
      if (res['data']) {
        AppStore.user.next(res['data']);
        this.toastr.success(`Your in... 🕵️‍`, 'Login');
        return Observable.of(true);
      }
      this.toastr.error(`Sorry no more anonymous.`, 'Login');
      return Observable.of(false);
    });
  }

  /*
  * this.userSubject.next(undefined); Good Example ?
  */
  public logout() {
    AppStore.resetData();

    this.socket.emit('free', JSON.stringify({ username: AppStore.user.getValue().username }));
    AppStore.user.next(undefined);

    this.toastr.info('You Are All Free Now!', 'Logout');
    window.open('https://www.youtube.com/watch?v=_yYS0ZZdsnA', '_blank');
  }

}
