import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrip } from '../../interfaces/trip';
import { TripService } from '../../services/trip.service';
import iziToast from 'izitoast';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-settings-modal',
  templateUrl: './trip-settings-modal.component.html',
  styleUrls: ['./trip-settings-modal.component.scss']
})
export class TripSettingsModalComponent implements OnInit {
  @Input() tripId!: number;
  trip: ITrip | undefined;
  errorMessage: string | null = null;
  selectedFile: File | null = null;

  constructor(public activeModal: NgbActiveModal, 
              private tripService: TripService,
              private router: Router) {}

  ngOnInit() {
    this.getTrip(this.tripId);
  }

  confirmDeleteTrip() {
    Swal.fire({
      title: 'Sei sicuro?',
      text: "Questa azione non può essere annullata!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sì, elimina!',
      cancelButtonText: 'Annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTrip();
      }
    });
  }

  deleteTrip() {
    if (this.trip) {
      this.tripService.deleteTrip(this.trip.id).subscribe({
        next: () => {
          this.activeModal.close('Delete click');
          iziToast.success({
            title: 'Success',
            message: 'Trip successfully eliminated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            this.router.navigate(['/trip']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Errore nella cancellazione del viaggio';
          console.error('Errore nella cancellazione del viaggio', error);
        }
      });
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }

  getTrip(id: number): void {
    this.tripService.getTripById(id).subscribe({
      next: (trip) => {
        this.trip = trip;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel recupero del viaggio';
        console.error('Errore nel recupero del viaggio', error);
      }
    });
  }

  saveSettings() {
    if (this.trip) {
      if (this.selectedFile) {
        this.uploadImageAndUpdateTrip();
        
      } else {
        this.updateTrip();
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImageAndUpdateTrip() {
    if (this.trip && this.selectedFile) {
      this.tripService.uploadProfileImage(this.trip.id, this.selectedFile).subscribe({
        next: (updatedTrip) => {
          this.trip = updatedTrip;
          this.updateTrip();
        },
        error: (error) => {
          this.errorMessage = 'Errore durante il caricamento dell\'immagine';
          console.error('Errore durante il caricamento dell\'immagine', error);
        }
      });
    }
  }

  updateTrip() {
    if (this.trip) {
      this.tripService.updateTrip(this.trip.id, this.trip).subscribe({
        next: (updatedTrip) => {
          iziToast.success({
            title: 'Success',
            message: 'Trip successfully updated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Errore durante l\'aggiornamento del viaggio';
          console.error('Errore durante l\'aggiornamento del viaggio', error);
        }
      });
    }
  }
}
