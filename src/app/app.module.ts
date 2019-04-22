import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';
import { OnboardedStudentsListComponent } from './onboarded-students-list/onboarded-students-list.component';

import { LoginService } from './services/login.service'
import { StudentService } from './services/student.service'
import { CategoryService } from './services/categories.service'

import { FilterPipe }from './custom-pipes/filter.pipe';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserLoggedInComponent } from './user-logged-in/user-logged-in.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingFormComponent,
    OnboardedStudentsListComponent,
    FilterPipe,
    LoginFormComponent,
    UserLoggedInComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    StudentService,
    CategoryService,
    LoginService
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
