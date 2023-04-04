import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpcomingWeekComponent } from './user-upcoming-week.component';

describe('UserUpcomingWeekComponent', () => {
  let component: UserUpcomingWeekComponent;
  let fixture: ComponentFixture<UserUpcomingWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpcomingWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpcomingWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
