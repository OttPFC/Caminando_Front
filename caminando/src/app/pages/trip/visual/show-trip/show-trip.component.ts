import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ITrip } from '../../../../interfaces/trip';
import { TripService } from '../../../../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { UserService } from '../../../../services/user.service';
import { IRegisterUser } from '../../../../interfaces/register-user';
import mapboxgl from 'mapbox-gl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TripSettingsModalComponent } from '../../../../components/trip-settings-modal/trip-settings-modal.component';
import { StepComponent } from '../../../../components/step/step.component';
import { StepService } from '../../../../services/step.service';
import { IStep } from '../../../../interfaces/step';
import { PositionComponent } from '../../../../components/position/position.component';
import { StepEditModalComponent } from '../../../../components/step-edit-modal/step-edit-modal.component';

@Component({
  selector: 'app-show-trip',
  templateUrl: './show-trip.component.html',
  styleUrls: ['./show-trip.component.scss']
})
export class ShowTripComponent implements OnInit {

  
  @Output() tripSelected = new EventEmitter<number>();
  @ViewChild(PositionComponent) positionComponent!: PositionComponent;
  initialPosition: [number, number] = [12.4964, 41.9028];

  showCommentForm: { [key: number]: boolean } = {};

  errorMessage: string | null = null;
  trip: ITrip | undefined;
  user: IRegisterUser | undefined;
  step: IStep[] = [];
  showForm: boolean = false;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private usrSvc: UserService,
    private modalService: NgbModal,
    private stepService: StepService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTrip(id);
    this.loadUser();
  }

  openTripSettings() {
    const modalRef = this.modalService.open(TripSettingsModalComponent);
    if (this.trip) {
      modalRef.componentInstance.tripId = this.trip.id; 
    }
  }


  openEditStepModal(step: IStep) {
    const modalRef = this.modalService.open(StepEditModalComponent);
    modalRef.componentInstance.step = step;
    modalRef.result.then((result) => {
      if (result === 'deleted') {
        this.trip!.steps = this.trip!.steps.filter(s => s.id !== step.id);
      } else if (result) {
        const index = this.trip?.steps.findIndex(s => s.id === result.id);
        if (index !== undefined && index !== -1) {
          this.trip!.steps[index] = result;
        }
      }
    }).catch((error) => {
      console.log('Edit step modal dismissed:', error);
    });
  }
toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleCommentForm(stepId: number) {
  this.showCommentForm[stepId] = !this.showCommentForm[stepId];
}

  loadUser() {
    this.authService.user$.subscribe({
      next: (user) => {
        this.user = user || undefined;
        if (this.user) {
          this.getUser(this.user.id);
        }
      },
      error: (err) => {
        this.errorMessage = 'Errore nel caricamento dell\'utente';
      }
    });
  }

  getUser(id: number) {
    this.usrSvc.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero dell\'utente';
      }
    });
  }

  getTrip(id: number): void {
    this.tripService.getTripById(id).subscribe({
      next: (trip) => {
        this.trip = trip;
        if (this.trip.steps.length > 0) {
          this.trip.steps = this.sortStepsByDate(this.trip.steps);
          const firstStep = this.trip.steps[0];
          if (firstStep.position) {
            this.initialPosition = [firstStep.position.longitude, firstStep.position.latitude];
          }
        }
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero del viaggio';
      }
    });
  }

  sortStepsByDate(steps: IStep[]): IStep[] {
    return steps.sort((a, b) => {
      const dateA = new Date(a.arrivalDate).getTime();
      const dateB = new Date(b.arrivalDate).getTime();
      return dateA - dateB;
    });
  }

  onStepClick(step: IStep) {
    if (step.position) {
      const { longitude, latitude } = step.position;
      this.positionComponent.setMarkerPosition([longitude, latitude]);
    }
  }

  closeForm() {
    this.showForm = false;
  }
}
