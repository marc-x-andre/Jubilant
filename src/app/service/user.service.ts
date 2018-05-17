import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';


@Injectable()
export class UserService {

  public user: UserModel;

  constructor(private http: HttpClient) {
    this.fetchCurrentUser();

    this.login('user', 'user');
  }


  public fetchCurrentUser() {
    this.http.get('http://10.140.23.43/api/user').subscribe(data => {
      if (data) {
        this.user = data['USER'];
        console.log('UserModel is already logged in: ', this.user.username);
      }
    });
  }


  public login(username: string, password: string) {
    return this.http.post('http://10.140.23.43/api/login', null, { params: { username: username, password: password } }).subscribe(data => {
      this.user = data['USER'];
      console.log(this.user);
    }, error => {
      console.log('what DO YOU WANT', error['error']);
      // alert(error['error']['MESSAGE']);
    });
  }

}
