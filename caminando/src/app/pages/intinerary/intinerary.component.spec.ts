import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntineraryComponent } from './intinerary.component';

describe('IntineraryComponent', () => {
  let component: IntineraryComponent;
  let fixture: ComponentFixture<IntineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntineraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
