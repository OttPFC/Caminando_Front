import { TestBed } from '@angular/core/testing';

import { PlaceToStayService } from './place-to-stay.service';

describe('PlaceToStayService', () => {
  let service: PlaceToStayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceToStayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
