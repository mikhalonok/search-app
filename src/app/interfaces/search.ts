import { Bike, BikeDetail } from './bike';

export interface SearchBikesRequest {
  page: number;
  per_page: number;
  serial: string;
  query: string;
  manufacturer: string;
  cycle_type: string;
  propulsion_type: string;
  colors: string;
  location: string;
  distance: string;
  stolenness: string;
}

export interface SearchBikesResponse {
  bikes: Bike[];
}

export interface GetBikeResponse {
  bike: BikeDetail;
}
