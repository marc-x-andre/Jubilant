import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {

  public userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
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
      if (data['USER']) {
        this.userSubject.next(data['USER']);
        this.toastr.success(`I'm ${username}, and this is my favorite game on the Internet`, 'Login');
        return Observable.of(true);
      }
      this.toastr.error(`You shall not pass`, 'Bad Credentials');
      return Observable.of(false);
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
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log('what DO YOU WANT', error['error']);
    });
  }

}
