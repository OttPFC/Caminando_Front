import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { StepService } from '../../services/step.service';
import { IPosition } from '../../interfaces/position';
import { IStep } from '../../interfaces/step';
import { StepPositionModel } from '../../interfaces/step-position-model';
import { PositionComponent } from '../position/position.component';

@Component({
  selector: 'app-step', 
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() tripId!: number;
  stepForm: FormGroup;
  positionForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private stepService: StepService,
    public activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
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
    if (this.tripId === undefined) {
      this.tripId = +this.route.snapshot.params['tripId'];
    }
  }

  closeModal(): void {
    this.activeModal.close();
  }
  openMapModal() {
    const modalRef = this.modalService.open(PositionComponent, {
      backdrop: 'static',
      keyboard: false
    });

    modalRef.result.then((coordinates: { latitude: number, longitude: number }) => {
      if (coordinates) {
        this.positionForm.patchValue({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        });
      }
    }, (reason) => {
      console.log('Map modal dismissed:', reason);
    });
  }


  formatDate(date: { year: number, month: number, day: number }): string {
    const month = date.month < 10 ? `0${date.month}` : date.month;
    const day = date.day < 10 ? `0${date.day}` : date.day;
    return `${date.year}-${month}-${day}`;
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
                  this.activeModal.close();
                  window.location.reload();
                },
                error: (err) => console.error('Errore durante il caricamento delle immagini', err)
              });
            } else {
              this.activeModal.close();
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
  
  
  

  onFilesSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }
}
