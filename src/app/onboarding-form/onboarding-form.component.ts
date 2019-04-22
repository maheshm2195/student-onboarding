import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StudentService } from '../services/student.service';
import { CategoryService } from '../services/categories.service';

import { Student } from '../models/student';
import { Category } from '../models/category';
import { Document } from '../models/document';

import { map } from 'rxjs/operators'


@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit {
  allCategories: Category[]
  allDocuments: Document[]
  allStudents: Student[];
  statusCode: number;
  studentIdToUpdate = null;
  processValidation = false;

  //Create constructor to get service instance
  constructor(private fb: FormBuilder, private studentService: StudentService, private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {
  }

  studentForm = null;
  state$ = null;
  actionToTake = null;

  //Create ngOnInit() and and load students
  ngOnInit(): void {
    // get state from window history. This state is set when a user clicks on view/edit buttons of a student
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));

    this.state$.subscribe(
      (res) => {
        this.studentIdToUpdate = res.studentId;
        this.actionToTake = res.action;
      },
      (err) => console.log(err),
    );


    //Create form
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      categories: ["0"],
      documents: this.fb.array([]),
      dob: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      lastClassScore: ['', Validators.required]
    });

    // load data
    this.loadData();

    if (this.studentIdToUpdate != null && this.actionToTake == "view") {
      this.studentForm.disable();
    }
  }

  // load data and populate form based on whether studentIdToUpdate is null or not. 
  // If it's null means we need an unfilled form, else we want to populate the form 
  // with student details pointed by studentIdToUpdate
  loadData() {
    this.categoryService.getAllCategories()
      .subscribe(
        data => {
          this.allCategories = data;

          // this.getAllStudents();
          if (this.studentIdToUpdate != null) {
            this.loadStudentToEdit(this.studentIdToUpdate);
          } else {
            this.allDocuments = this.allCategories[0].documents;
            this.createDocumentFormArray(this.allDocuments);
          }
        },
        errorCode => this.statusCode = errorCode);
  }

  // clear and then populate documents in the form based on category selection by user
  createDocumentFormArray(documentsOfCategory) {
    this.clearDocuments();

    documentsOfCategory.forEach((document) => {
      if (document.mandatory) {
        this.documents.push(this.fb.control(document.submitted, Validators.requiredTrue));
      } else {
        this.documents.push(this.fb.control(document.submitted));
      }
    });
  }

  //Handle create and update student
  onStudentFormSubmit() {
    this.processValidation = true;
    if (this.studentForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.statusCode = null;
    let student = this.studentForm.value;
    if (this.studentIdToUpdate == null) {
      //Generate student id then create student
      this.studentService.getAllStudents()
        .subscribe(students => {

          //Generate student id
          if (students.length > 0) {
            let maxIndex = students.length - 1;
            let studentWithMaxIndex = students[maxIndex];
            let studentId = studentWithMaxIndex.id + 1;
            student.id = studentId;
          } else {
            student.id = 1;
          }

          //Create student
          this.studentService.createStudent(student)
            .subscribe(successCode => {
              this.statusCode = successCode;
              this.loadData();
              this.backToCreateStudent();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      //Handle update student
      student.id = this.studentIdToUpdate;
      this.studentService.updateStudent(student)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.loadData();
          this.backToCreateStudent();
        },
          errorCode => this.statusCode = errorCode);
    }
  }

  //Load student by id to edit
  loadStudentToEdit(studentId: string) {
    this.statusCode = null;
    this.studentService.getStudentById(studentId)
      .subscribe(student => {
        this.studentIdToUpdate = student.id;
        this.allDocuments = this.allCategories[Number(student.categories)].documents;

        this.createDocumentFormArray(this.allDocuments);

        this.studentForm.setValue({
          name: student.name,
          categories: student.categories,
          documents: student.documents,
          dob: student.dob,
          fatherName: student.fatherName,
          motherName: student.motherName,
          lastClassScore: student.lastClassScore
        });
        this.processValidation = true;
      },
        errorCode => this.statusCode = errorCode);

  }

  //Go back from update to create
  backToCreateStudent() {
    this.studentIdToUpdate = null;
    this.studentForm.reset();
    this.processValidation = false;
  }

  // on change of selection of category from drop down
  onCategoryChange(filterVal: any) {
    this.allDocuments = this.allCategories[filterVal].documents;
    this.createDocumentFormArray(this.allDocuments);
  }

  // get documents from form
  get documents(): FormArray {
    return this.studentForm.get('documents') as FormArray;
  };

  // clear documents in form
  clearDocuments() {
    while (0 !== this.documents.length) {
      this.documents.removeAt(0);
    }
  }

}
