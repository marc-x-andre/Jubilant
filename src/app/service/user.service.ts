import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {

  public user: UserModel;

  constructor(private http: HttpClient) {
    this.fetchCurrentUser();
  }

  public fetchCurrentUser() {
    this.http.get(`${environment.api}/user`).subscribe(data => {
      if (data) {
        this.user = data['USER'];
        console.log('UserModel is already logged in: ', this.user.username);
      }
    });
  }

  public login(username: string, password: string) {
    return this.http.post(`${environment.api}/login`, null, { params: { username: username, password: password } }).subscribe(data => {
      this.user = data['USER'];
      console.log(this.user);
    }, error => {
      console.log('what DO YOU WANT', error['error']);
    });
  }

}
