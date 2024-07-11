import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepEditModalComponent } from './step-edit-modal.component';

describe('StepEditModalComponent', () => {
  let component: StepEditModalComponent;
  let fixture: ComponentFixture<StepEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
