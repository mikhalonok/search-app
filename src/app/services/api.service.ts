import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetBikeResponse,
  SearchBikesRequest,
  SearchBikesResponse,
} from '../interfaces/search';
import { buildQueryString } from '../utilities/build-query-string';
import { map, Observable, shareReplay } from 'rxjs';
import { Bike, BikeDetail } from '../interfaces/bike';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://bikeindex.org:443/api/v3/';

  constructor(private httpClient: HttpClient) {}

  searchBikes(params: Partial<SearchBikesRequest>): Observable<Bike[]> {
    const queryString = buildQueryString(params);

    return this.httpClient
      .get<SearchBikesResponse>(this.baseUrl + '/search?' + queryString)
      .pipe(
        map(({ bikes }) => bikes),
        shareReplay(),
      );
  }

  getBikeById(id: number): Observable<BikeDetail> {
    return this.httpClient
      .get<GetBikeResponse>(this.baseUrl + `/bikes/${id}`)
      .pipe(
        map(({ bike }) => bike),
        shareReplay(),
      );
  }
}
