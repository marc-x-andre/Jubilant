import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {

  public userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.fetchCurrentUser();
  }

  public fetchCurrentUser() {
    this.http.get(`${environment.api}/user`, { withCredentials: true }).subscribe((data: UserModel) => {
      if (data) {
        this.userSubject.next(data);
      }
    });
  }

  public getUserObservable(): Observable<UserModel> {
    return this.userSubject.asObservable();
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${environment.api}/login`, null, { params: { username: username, password: password }, withCredentials: true }
    ).switchMap(data => {
      this.userSubject.next(data['USER']);
      this.toastr.success(`I'm ${username}, and this is my favorite game on the Internet`, 'Login');
      if (data['USER']) {
        return Observable.of(true);
      }
      return Observable.of(false);
    },
      err => {
        this.toastr.error(`You shall not pass`, 'Bad Credentials');
        return false;
      });
  }

  /*
  *
  * this.userSubject.next(undefined); Good Example ?
  *
  */
  public logout() {
    this.http.get(`${environment.api}/logout`, { withCredentials: true }).subscribe(data => {
      this.userSubject.next(undefined);
      this.toastr.info('You Are All Free Now!', 'Logout');
      window.open('https://www.youtube.com/watch?v=_yYS0ZZdsnA', '_blank');
    }, error => {
      console.log('what DO YOU WANT', error['error']);
    });
  }

}
