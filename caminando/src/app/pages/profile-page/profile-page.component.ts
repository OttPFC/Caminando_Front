import { Component } from '@angular/core';
import { IStep } from '../../interfaces/step';
import { StepService } from '../../services/step.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  step: IStep = {
    id: 0,
    description: '',
    arrivalDate: new Date(),
    departureDate: new Date()
  }
  tripId?: number;  

  constructor(private stepService: StepService) {}

  
  onSubmit(form: NgForm) {
    if (form.valid && this.tripId) {
      this.stepService.addStep(this.tripId, this.step).subscribe({
        next: (step) => {
          console.log('Step added successfully', step);
          form.resetForm();
        },
        error: (error) => console.error('Error adding step', error)
      });
    }
  }
}
