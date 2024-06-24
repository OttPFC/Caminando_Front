import { Component } from '@angular/core';
import { IStep } from '../../interfaces/step';
import { StepService } from '../../services/step.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  step: IStep = { 
    id : 0, 
    description: '',
    arrivalDate: new Date(),
    departureDate: new Date()
  };
  tripId?: number; 
  
  constructor(private stepService: StepService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tripId = +params['tripId']; 
    });
  }

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
