import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

  public user: User;

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
    return this.http.post('http://localhost/api/login', null, {params: {username: username, password: password}}).subscribe(data => {
      this.user = data['USER'];
      console.log(this.user);
    }, error => {
      console.log('WTF DO YOU WANT', error['error']);
      alert('whoopsie doopsie');
    });
  }

}
