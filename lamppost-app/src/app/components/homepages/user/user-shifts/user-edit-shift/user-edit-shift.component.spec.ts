import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditShiftComponent } from './user-edit-shift.component';

describe('UserEditShiftComponent', () => {
  let component: UserEditShiftComponent;
  let fixture: ComponentFixture<UserEditShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
