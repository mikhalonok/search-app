import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch bikes correctly', () => {
    const mockBikes = [
      { id: 1, name: 'Bike 1' },
      { id: 2, name: 'Bike 2' },
    ];

    service.searchBikes({}).subscribe((bikes) => {
      expect(bikes).toEqual(mockBikes as any);
    });

    const req = httpTestingController.expectOne((request) =>
      request.url.includes('/search'),
    );
    expect(req.request.method).toEqual('GET');
    req.flush({ bikes: mockBikes });
  });

  it('should fetch bike details correctly', () => {
    const mockBikeDetail = {
      id: 1,
      name: 'Bike 1',
      description: 'Description of Bike 1',
    };

    service.getBikeById(1).subscribe((bikeDetail) => {
      expect(bikeDetail).toEqual(mockBikeDetail as any);
    });

    const req = httpTestingController.expectOne((request) =>
      request.url.includes('/bikes/1'),
    );
    expect(req.request.method).toEqual('GET');
    req.flush({ bike: mockBikeDetail });
  });
});
