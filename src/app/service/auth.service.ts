import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserModel } from '../model/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    private user: UserModel;

    constructor(private router: Router, private userService: UserService) {
        this.userService.getUserObservable().subscribe(user => {
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

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
