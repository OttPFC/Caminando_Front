import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSettingsModalComponent } from './trip-settings-modal.component';

describe('TripSettingsModalComponent', () => {
  let component: TripSettingsModalComponent;
  let fixture: ComponentFixture<TripSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripSettingsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
