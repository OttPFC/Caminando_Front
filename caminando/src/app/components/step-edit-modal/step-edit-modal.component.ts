import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IStep } from '../../interfaces/step';
import { StepService } from '../../services/step.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-step-edit-modal',
  templateUrl: './step-edit-modal.component.html',
  styleUrls: ['./step-edit-modal.component.scss']
})
export class StepEditModalComponent implements OnInit {
  @Input() step!: IStep;
  stepForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private stepService: StepService
  ) {
    this.stepForm = this.fb.group({
      description: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.step) {
      this.stepForm.patchValue(this.step);
    }
  }

  saveStep() {
    if (this.stepForm.valid) {
      const updatedStep = { ...this.step, ...this.stepForm.value };
      this.stepService.updateStep(this.step.id, updatedStep).subscribe(() => {
        this.activeModal.close(updatedStep);
      });
      iziToast.success({
        title: 'Success',
        message: 'Step updated successfully',
        position: 'bottomCenter'
      });
    }
  }

  deleteStep() {
    this.stepService.deleteStep(this.step.id).subscribe(() => {
      this.activeModal.close('deleted');
    });
    iziToast.success({
        title: 'Success',
        message: 'Step deleted successfully',
        position: 'bottomCenter'
      });
  }
}
