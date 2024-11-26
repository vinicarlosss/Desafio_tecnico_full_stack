export interface RideEstimateResponse {
  origin: Coordinates;
  destination: Coordinates;
  originString: string;
  destinationString: string;
  distance: number;
  duration: string;
  options: RideOption[];
  routeResponse: Routes;
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

interface RouteResponse { 
  distanceMeters: number;
  duration: string;
  polyline: Polyline;
}

interface Routes {
  routes: RouteResponse[];
}

interface Polyline {
  encodedPolyline: string;
}