import { TestBed } from '@angular/core/testing';

import { SerapiService } from './serapi.service';

describe('SerapiService', () => {
  let service: SerapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
