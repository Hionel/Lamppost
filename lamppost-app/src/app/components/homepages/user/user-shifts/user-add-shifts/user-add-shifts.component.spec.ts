import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddShiftsComponent } from './user-add-shifts.component';

describe('UserAddShiftsComponent', () => {
  let component: UserAddShiftsComponent;
  let fixture: ComponentFixture<UserAddShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
