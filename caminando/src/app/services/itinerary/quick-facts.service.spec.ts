import { TestBed } from '@angular/core/testing';

import { QuickFactsService } from './quick-facts.service';

describe('QuickFactsService', () => {
  let service: QuickFactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickFactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
