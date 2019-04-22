import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  errorMessage: string;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }

  onloginFormSubmit() {
    if(this.loginForm.get('username').value == "admin" && this.loginForm.get('password').value == "admin") {
      this.loginService.setLogIn(true);
      this.loginService.setUserName(this.loginForm.get('username').value);
    } else {
      this.errorMessage = "Invalid credentials. Please enter Username as 'admin' and password as 'admin' for login";
    }
  }

  resetForm() {
    this.loginForm.reset();
  }
}
