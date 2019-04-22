import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-user-logged-in',
  templateUrl: './user-logged-in.component.html',
  styleUrls: ['./user-logged-in.component.css']
})
// this is the main component after user has logged in
export class UserLoggedInComponent implements OnInit {

  adminName: string = null;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.adminName = this.loginService.getUserName();
  }

}
