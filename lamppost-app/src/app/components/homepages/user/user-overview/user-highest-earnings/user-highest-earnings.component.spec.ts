import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHighestEarningsComponent } from './user-highest-earnings.component';

describe('UserHighestEarningsComponent', () => {
  let component: UserHighestEarningsComponent;
  let fixture: ComponentFixture<UserHighestEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHighestEarningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHighestEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
