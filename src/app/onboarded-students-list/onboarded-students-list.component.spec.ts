import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedStudentsListComponent } from './onboarded-students-list.component';

describe('OnboardedStudentsListComponent', () => {
  let component: OnboardedStudentsListComponent;
  let fixture: ComponentFixture<OnboardedStudentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardedStudentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
