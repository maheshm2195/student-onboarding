import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoggedInComponent } from './user-logged-in.component';

describe('UserLoggedInComponent', () => {
  let component: UserLoggedInComponent;
  let fixture: ComponentFixture<UserLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
