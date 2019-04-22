import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-onboarded-students-list',
  templateUrl: './onboarded-students-list.component.html',
  styleUrls: ['./onboarded-students-list.component.css']
})
export class OnboardedStudentsListComponent implements OnInit {

  allStudents: Student[];
  statusCode: number;
  studentCategoryFilter: string = "all";
  studentNameFilter: string = "";

  // dialogRef: MatDialog<ConfirmationDialog>;
  public dialogRef: MatDialogRef<ConfirmationDialogComponent>

  constructor(private studentService: StudentService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllStudents();
  }

  //Fetch all students
  getAllStudents() {
    this.studentService.getAllStudents()
      .subscribe(
        data => this.allStudents = data,
        errorCode => this.statusCode = errorCode);
  }

  // send the studentId to form component for viewing using window state
  sendStudentToView(studentId: string) {
    this.statusCode = null;
    this.router.navigateByUrl('logged/onboard-students', {
      state: {
        studentId: studentId,
        action: "view"
      }
    });
  }

  // send the studentId to form component for editing using window state
  sendStudentToEdit(studentId: string) {
    this.statusCode = null;
    this.router.navigateByUrl('logged/onboard-students', {
      state: {
        studentId: studentId,
        action: "edit"
      }
    });
  }

  // Delete student after confirming with user
  deleteStudent(studentId: string) {

    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete ?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.statusCode = null;
        this.studentService.deleteStudentById(studentId)
          .subscribe(successCode => {
            //this.statusCode = successCode;
            //Expecting success code 204 from server
            this.statusCode = 204;
            this.getAllStudents();
          },
            errorCode => this.statusCode = errorCode);
      }
      this.dialogRef = null;
    });
  }

}