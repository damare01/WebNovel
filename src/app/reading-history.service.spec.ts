import { TestBed, inject } from '@angular/core/testing';

import { ReadingHistoryService } from './reading-history.service';

describe('ReadingHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadingHistoryService]
    });
  });

  it('should be created', inject([ReadingHistoryService], (service: ReadingHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
