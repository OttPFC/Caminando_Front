export interface GeocodingFeature {
    place_name: string;
    center: [number, number];
  }
  
  export interface GeocodingResponse {
    features: GeocodingFeature[];
  }