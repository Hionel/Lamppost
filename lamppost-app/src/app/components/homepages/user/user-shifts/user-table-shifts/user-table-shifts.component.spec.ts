import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableShiftsComponent } from './user-table-shifts.component';

describe('UserTableShiftsComponent', () => {
  let component: UserTableShiftsComponent;
  let fixture: ComponentFixture<UserTableShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTableShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
