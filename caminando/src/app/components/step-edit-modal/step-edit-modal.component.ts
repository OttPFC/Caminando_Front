import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IStep } from '../../interfaces/step';
import { StepService } from '../../services/step.service';
import iziToast from 'izitoast';
import { ImagesService } from '../../services/general/images.service';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-step-edit-modal',
  templateUrl: './step-edit-modal.component.html',
  styleUrls: ['./step-edit-modal.component.scss']
})
export class StepEditModalComponent implements OnInit {
  @Input() step!: IStep;
  stepForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private stepService: StepService,
    private imageService: ImagesService
  ) {
    this.stepForm = this.fb.group({
      description: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.step.id) {
      this.getStepById(this.step.id);
    }
  }

  getStepById(id: number) {
    this.stepService.getStepById(id).subscribe(step => {
      this.step = step;
      this.stepForm.patchValue(this.step);
      if (!this.step.images) {
        this.step.images = [];
      }
    });
  }

  saveStep() {
    if (this.stepForm.valid) {
      const updatedStep = { ...this.step, ...this.stepForm.value };
  
      // Esegui sempre l'aggiornamento del Step
      const updateStep$ = this.stepService.updateStep(this.step.id, updatedStep);
  
      // Carica le immagini solo se ce ne sono di selezionate
      const uploadImages$ = this.selectedFiles.length > 0
        ? this.stepService.uploadStepImages(this.step.id, this.selectedFiles)
        : of(null); // Ritorna un observable vuoto se non ci sono immagini
  
      // Esegui entrambi gli observable in parallelo
      forkJoin([updateStep$, uploadImages$]).subscribe({
        next: () => {
          iziToast.success({
            title: 'Success',
            message: 'Step and images updated successfully',
            position: 'bottomCenter'
          });
          this.activeModal.close(updatedStep);
          window.location.reload();
        },
        error: (err) => {
          iziToast.error({
            title: 'Error',
            message: 'An error occurred while saving the step',
            position: 'bottomCenter'
          });
          console.error('Error saving step:', err);
        }
      });
    }
  }
  

  deleteStep() {
    this.stepService.deleteStep(this.step.id).subscribe({
      next: () => {
        this.activeModal.close('deleted');
        iziToast.success({
          title: 'Success',
          message: 'Step deleted successfully',
          position: 'bottomCenter'
        });
      },
      error: (err) => {
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while deleting the step',
          position: 'bottomCenter'
        });
        console.error('Error deleting step:', err);
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  deleteImage(imageId: number) {
    this.imageService.deleteImage(imageId).subscribe({
      next: () => {
        this.step.images = this.step.images!.filter(image => image.id !== imageId);
        iziToast.success({
          title: 'Success',
          message: 'Image deleted successfully',
          position: 'bottomCenter'
        });
      },
      error: (err) => {
        iziToast.error({
          title: 'Error',
          message: 'An error occurred while deleting the image',
          position: 'bottomCenter'
        });
        console.error('Error deleting image:', err);
      }
    });
  }
}
