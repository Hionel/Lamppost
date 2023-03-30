import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShiftsComponent } from './user-shifts.component';

describe('UserShiftsComponent', () => {
  let component: UserShiftsComponent;
  let fixture: ComponentFixture<UserShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
