import { Component, Input, OnInit } from '@angular/core';
import { IStep } from '../../interfaces/step';
import { StepService } from '../../services/step.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ITrip } from '../../interfaces/trip';
import { TripService } from '../../services/trip.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() tripId!: number;
  trip: ITrip | undefined;
  errorMessage: string | null = null;
  stepForm: FormGroup;

  constructor(
    private stepService: StepService, 
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private tripService: TripService
  ) {
    this.stepForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      images: ['']
    });
  }

  ngOnInit() {
    this.getTrip(this.tripId);
  }

  closeModal() {
    this.activeModal.close();
  }

  saveStep() {
    if (this.stepForm.valid) {
      const formValues = this.stepForm.value;
      const newStep: IStep = {
        ...formValues,
        arrivalDate: this.convertDate(formValues.arrivalDate),
        departureDate: this.convertDate(formValues.departureDate)
      };

      this.stepService.addStep(this.tripId, newStep).subscribe({
        next: (step) => {
          this.activeModal.close(step); 
          console.log(step + "creato");
        },
        error: (error) => {
          this.errorMessage = 'Errore nel salvataggio dello step';
        }
      });
    }
  }

  convertDate(dateStruct: NgbDateStruct | null): Date | null {
    if (dateStruct) {
      return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
    }
    return null;
  }

  getTrip(id: number): void {
    this.tripService.getTripById(id).subscribe({
      next: (trip) => {
        this.trip = trip;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero del viaggio';
      }
    });
  }
}
