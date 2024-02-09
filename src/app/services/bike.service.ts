import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  private _searchValue$ = new BehaviorSubject('');

  constructor() {}

  get currentSearchValue$(): BehaviorSubject<string> {
    return this._searchValue$;
  }

  setSearchValue(value: string): void {
    this._searchValue$.next(value);
  }
}
