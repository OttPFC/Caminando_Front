import { TestBed } from '@angular/core/testing';

import { SuggestItineraryService } from './suggest-itinerary.service';

describe('SuggestItineraryService', () => {
  let service: SuggestItineraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestItineraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
