import { Injectable } from '@angular/core';

import { CanActivate, Router, Route } from '@angular/router';

@Injectable()
export class LoginService implements CanActivate {
    loggedIn: boolean = false;
    userName: string = null;

    constructor(public _router: Router) {}

    canActivate(): boolean {
        if (this.loggedIn) {
            return true;
        }
        
        this._router.navigate(['/login']);
        return false;
      }

      // set the state whether a valid login has been made or not
      setLogIn(loggedIn: boolean) {
          this.loggedIn = loggedIn;
          this._router.navigate(['/logged']);
      }

      // get name of user who has logged in
      getUserName(): string {
        return this.userName;
      }

      // set the name of user who has logged in
      setUserName(userName: string) {
        this.userName = userName;
      }
} 