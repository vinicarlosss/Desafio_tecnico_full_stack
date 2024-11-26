export interface RideEstimateResponse {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: RideOption[];
  routeResponse: object;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface RideOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: RideReview;
  value: number;
}

interface RideReview {
  rating: number;
  comment: string;
}
