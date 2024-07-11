import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepService } from '../../services/step.service';
import { IPosition } from '../../interfaces/position';
import { IStep } from '../../interfaces/step';
import { StepPositionModel } from '../../interfaces/step-position-model';
import { PositionService } from '../../services/position.service';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import iziToast from 'izitoast';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() tripId!: number;
  @Output() stepSaved = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  stepForm: FormGroup;
  positionForm: FormGroup;
  selectedFiles: File[] = [];
  locationSuggestions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private stepService: StepService,
    private positionService: PositionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.stepForm = this.fb.group({
      description: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
    });
    this.positionForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      timestamp: new Date().toISOString().split('T')[0],
      nomeLocalita: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.positionService.currentPosition.subscribe(position => {
      this.positionForm.patchValue({
        latitude: position.latitude,
        longitude: position.longitude,
        nomeLocalita: position.placeName || ''
      });
    });
    this.positionForm.get('nomeLocalita')?.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.positionService.searchLocation(value))
    ).subscribe(suggestions => {
      this.locationSuggestions = suggestions;
      this.cdr.detectChanges();
    });
  }

  selectSuggestion(suggestion: any) {
    this.positionForm.patchValue({
      nomeLocalita: suggestion.place_name,
      latitude: suggestion.center[1],
      longitude: suggestion.center[0]
    });
    console.log(suggestion);
    console.log(this.locationSuggestions);
    this.locationSuggestions = [];
    console.log('Suggerimenti dopo selezione:', this.locationSuggestions); // Per debug
    this.cdr.detectChanges();
  }

   saveStep(): void {
    if (this.stepForm.valid && this.positionForm.valid) {
      const formValues = this.stepForm.value;
      const formattedArrivalDate = this.formatDate(formValues.arrivalDate);
      const formattedDepartureDate = this.formatDate(formValues.departureDate);
  
      const position: IPosition = {
        ...this.positionForm.value,
        timestamp: new Date().toISOString().split('T')[0]  // aggiorna il timestamp al momento del salvataggio
      };
  
      const step: IStep = {
        ...this.stepForm.value,
        id: 0,
        arrivalDate: formattedArrivalDate,
        departureDate: formattedDepartureDate
      };
  
      const stepPositionModel: StepPositionModel = { step, position };
      this.stepService.addStep(stepPositionModel, this.tripId).subscribe({
        next: (createdStepPositionModel : IStep) => {
          const step = createdStepPositionModel.id;
          
          if (createdStepPositionModel && createdStepPositionModel.id && createdStepPositionModel.id) {
            if (this.selectedFiles.length > 0) {
              this.stepService.uploadStepImages(createdStepPositionModel.id, this.selectedFiles).subscribe({
                next: () => {
                  console.log('Immagini del passaggio caricate con successo');
                  iziToast.success({
                    title: 'Success',
                    message: 'Step saved successfully',
                    position: 'bottomCenter'
                  });
                  window.location.reload();
                },
                error: (err) => console.error('Errore durante il caricamento delle immagini', err)
              });
            } else {
              this.router.navigate(['/trip', this.tripId]);
            }
          } else {
            console.error('La risposta del servizio non contiene uno step valido o un ID');
          }
        },
        error: (err) => console.error('Errore durante la creazione dello step', err)
      });
    }
  }
  saveStep2(): void {
    if (this.stepForm.valid && this.positionForm.valid) {
      const formValues = this.stepForm.value;
      const formattedArrivalDate = this.formatDate(formValues.arrivalDate);
      const formattedDepartureDate = this.formatDate(formValues.departureDate);
  
      const position: IPosition = {
        ...this.positionForm.value,
        timestamp: new Date().toISOString().split('T')[0]  // aggiorna il timestamp al momento del salvataggio
      };
  
      const step: IStep = {
        ...this.stepForm.value,
        id: 0,
        arrivalDate: formattedArrivalDate,
        departureDate: formattedDepartureDate
      };
  
      const stepPositionModel: StepPositionModel = { step, position };
      
      this.stepService.addStep(stepPositionModel, this.tripId).subscribe({
        next: (createdStepPositionModel : IStep) => {
          console.log("Step model creato", createdStepPositionModel);
  
          console.log("Step model creato", createdStepPositionModel);
  
          // Verifica la struttura di createdStepPositionModel
          console.log("Struttura di createdStepPositionModel:", createdStepPositionModel);
          
          // Verifica l'accesso all'oggetto step e id
          const step = createdStepPositionModel.id;
          console.log("Oggetto step:", step);
          if (createdStepPositionModel && createdStepPositionModel.id && createdStepPositionModel.id) {
            if (this.selectedFiles.length > 0) {
              this.stepService.uploadStepImages(createdStepPositionModel.id, this.selectedFiles).subscribe({
                next: () => {
                  console.log('Immagini del passaggio caricate con successo');
                  
                  window.location.reload();
                },
                error: (err) => console.error('Errore durante il caricamento delle immagini', err)
              });
            } else {
              
              this.router.navigate(['/trip', this.tripId]);
            }
          } else {
            console.error('La risposta del servizio non contiene uno step valido o un ID');
          }
        },
        error: (err) => console.error('Errore durante la creazione dello step', err)
      });
    }
  }
  formatDate(date: { year: number, month: number, day: number }): string {
    const month = date.month < 10 ? `0${date.month}` : date.month;
    const day = date.day < 10 ? `0${date.day}` : date.day;
    return `${date.year}-${month}-${day}`;
  }

  onFilesSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  goBack(): void {
    this.formClosed.emit();
  }
}
