import { TestBed } from '@angular/core/testing';

import { CentralizedServiceService } from './centralized-service.service';

describe('CentralizedServiceService', () => {
  let service: CentralizedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralizedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
