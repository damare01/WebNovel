import { TestBed, inject } from '@angular/core/testing';

import { WnhttpService } from './wnhttp.service';

describe('WnhttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WnhttpService]
    });
  });

  it('should be created', inject([WnhttpService], (service: WnhttpService) => {
    expect(service).toBeTruthy();
  }));
});
