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

  constructor(public activeModal: NgbActiveModal, 
              private tripService: TripService,
              private router: Router) {}

  ngOnInit() {
    this.getTrip(this.tripId);
  }

  saveSettings() {
    if (this.trip) {
      this.tripService.updateTrip(this.trip.id, this.trip).subscribe({
        next: (updatedTrip) => {
          this.trip = updatedTrip;
          this.activeModal.close('Save click');
          iziToast.success({
            title: 'Success',
            message: 'Trip successfully eliminated.',
            position: 'bottomCenter'
          });
          setTimeout(() => {
            window.location.reload();;
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Errore nel salvataggio del viaggio';
        }
      });
    }
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
          }, 2000); // Ritardo di 3 secondi
        },
        error: (error) => {
          this.errorMessage = 'Errore nella cancellazione del viaggio';
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
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.trip) {
          this.trip.coverImage.imageURL = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
