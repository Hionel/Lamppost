import { TestBed } from '@angular/core/testing';

import { AllShiftsService } from './all-shifts.service';

describe('AllShiftsService', () => {
  let service: AllShiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllShiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
