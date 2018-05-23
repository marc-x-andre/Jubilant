import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppStore } from '../app.store';
import { User } from '../model/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private user: User;

    constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {
        AppStore.user.subscribe(user => {
            this.user = user;
        });
    }

    /*
    *
    * Good Example
    *
    */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.user) {
            return true;
        }
        this.toastr.error('Check under this toast', 'Not login');
        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
