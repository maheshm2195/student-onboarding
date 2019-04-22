import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginService } from ".//services/login.service"
import { LoginFormComponent } from '../app/login-form/login-form.component'
import { UserLoggedInComponent } from '../app/user-logged-in/user-logged-in.component'
import { OnboardingFormComponent } from '../app/onboarding-form/onboarding-form.component'
import { OnboardedStudentsListComponent } from '../app/onboarded-students-list/onboarded-students-list.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  {
    path: 'logged', component: UserLoggedInComponent, canActivate: [LoginService],
    children: [
      { path: '', redirectTo: 'onboarded-students', pathMatch: 'full' },
      { path: 'onboard-students', component: OnboardingFormComponent },
      { path: 'onboarded-students', component: OnboardedStudentsListComponent }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
