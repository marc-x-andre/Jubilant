import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {

  public userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {
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
      if (data['USER']) {
        return Observable.of(true);
      }
      return Observable.of(false);
    }, error => {
      console.log('what DO YOU WANT', error['error']);
      return false;
    });
  }

}
