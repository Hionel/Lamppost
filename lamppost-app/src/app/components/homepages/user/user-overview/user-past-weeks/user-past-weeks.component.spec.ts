import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPastWeeksComponent } from './user-past-weeks.component';

describe('UserPastWeeksComponent', () => {
  let component: UserPastWeeksComponent;
  let fixture: ComponentFixture<UserPastWeeksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPastWeeksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPastWeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
