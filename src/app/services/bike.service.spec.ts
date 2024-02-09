import { TestBed } from '@angular/core/testing';
import { BikeService } from './bike.service';

describe('BikeService', () => {
  let service: BikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default empty search value', () => {
    expect(service.currentSearchValue$.getValue()).toEqual('');
  });

  it('should set search value correctly', () => {
    const testSearchValue = 'test search value';
    service.setSearchValue(testSearchValue);
    expect(service.currentSearchValue$.getValue()).toEqual(testSearchValue);
  });
});
