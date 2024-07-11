import { Component, Input, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  
  @Input() interactive: boolean = false;
  @Input() initialPosition: [number, number] = [12.4964, 41.9028]; // Default location (Rome)
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.initializeMap(this.initialPosition);
  }

  initializeMap(center: [number, number]) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlMDk3IiwiYSI6ImNsd3N5MmRnajAxM2UybHIxa3IyNThvaGIifQ.Yo5tbnRNwBRMt7u4lfauqA';
    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ale097/clxx1i7jy00yy01qw5hqg7mzi',
      center: center,
      zoom: 12
    });

    this.marker = new mapboxgl.Marker({ draggable: this.interactive })
      .setLngLat(center)
      .addTo(this.map);

    this.map.on('click', (e) => {
      console.log('Map clicked, interactive:', this.interactive);
      if (this.interactive) {
        const lngLat = e.lngLat;
        this.marker.setLngLat(lngLat);
        this.updatePosition(lngLat);
      }
    });

    this.marker.on('dragend', () => {
      if (this.interactive) {
        const lngLat = this.marker.getLngLat();
        this.updatePosition(lngLat);
      }
    });
  }

  updatePosition(lngLat: mapboxgl.LngLat) {
    this.positionService.updatePosition({ latitude: lngLat.lat, longitude: lngLat.lng });
  }

  updatePosition2(lngLat: mapboxgl.LngLat) {
    const timestamp = new Date().toISOString();
    const nomeLocalita = 'Unknown'; // Puoi cambiarlo o cercare di ottenere un nome reale
    
    this.positionService.updatePosition2({ 
      latitude: lngLat.lat, 
      longitude: lngLat.lng, 
      timestamp: timestamp, 
      nomeLocalita: nomeLocalita 
    });
  }
  setMarkerPosition(position: [number, number]) {
    this.marker.setLngLat(position);
    this.map.flyTo({ center: position, zoom: 12 });
  }
}
