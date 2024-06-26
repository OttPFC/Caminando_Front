import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent implements OnInit {
  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.sendCurrentPosition(1); // Sostituisci con l'ID del tuo step
  }

  sendCurrentPosition(stepId: number): void {
    this.positionService.getCurrentPosition().subscribe({
      next: (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.positionService.sendPosition(stepId, coords).subscribe({
          next: (response) => console.log('Position sent successfully', response),
          error: (err) => console.error('Error sending position', err)
        });
      },
      error: (err) => console.error('Error getting position', err)
    });
  }
}

