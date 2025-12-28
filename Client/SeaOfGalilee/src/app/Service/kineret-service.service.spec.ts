import { TestBed } from '@angular/core/testing';

import { KineretServiceService } from './kineret-service.service';

describe('KineretServiceService', () => {
  let service: KineretServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KineretServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
