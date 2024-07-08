import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import mapboxgl from 'mapbox-gl';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent implements OnInit {

  map!: mapboxgl.Map;
  
  marker!: mapboxgl.Marker;

  constructor(public activeModal: NgbActiveModal,private positionService: PositionService) {}

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiYWxlMDk3IiwiYSI6ImNsd3N5MmRnajAxM2UybHIxa3IyNThvaGIifQ.Yo5tbnRNwBRMt7u4lfauqA';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ale097/clxx1i7jy00yy01qw5hqg7mzi',
      center: [12.4964, 41.9028], // Default center to Rome
      zoom: 12
    });

    this.marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([12.4964, 41.9028])
      .addTo(this.map);

    this.marker.on('dragend', () => {
      const lngLat = this.marker.getLngLat();
      console.log('Longitude:', lngLat.lng, 'Latitude:', lngLat.lat);
    });
  }

  selectCoordinates() {
    const lngLat = this.marker.getLngLat();
    this.activeModal.close({ latitude: lngLat.lat, longitude: lngLat.lng });
  }
  
  
}

