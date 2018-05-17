import {Injectable} from '@angular/core';
import {UserStats} from '../model/user_stats';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  private _user_info: UserStats;

  constructor(private http: HttpClient) {
    this.fetchCurrentUser();
    this.login('user', 'user');
  }


  public fetchCurrentUser() {
    this.http.get('http://localhost/api/user').subscribe(data => {
      console.log(data);
    });
  }


  public login(username: string, password: string) {
    this.http.post('http://localhost/api/login', null,
      {params: {username: username, password: password}}).subscribe(data => {
      console.log(data);
    });
  }


  get user_info(): UserStats {
    return this._user_info;
  }


  set user_info(user_info: UserStats) {
    this._user_info = user_info;
  }

}
