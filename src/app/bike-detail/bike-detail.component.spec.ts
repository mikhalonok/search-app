import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BikeDetailComponent } from './bike-detail.component';
import { HttpClientModule } from '@angular/common/http';

describe('BikeDetailComponent', () => {
  let component: BikeDetailComponent;
  let fixture: ComponentFixture<BikeDetailComponent>;
  let mockActivatedRoute: any;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    // Mock ActivatedRoute and ApiService
    mockActivatedRoute = {
      params: of({ id: 123 }),
    };

    mockApiService = jasmine.createSpyObj('ApiService', ['getBikeById']);
    await TestBed.configureTestingModule({
      declarations: [BikeDetailComponent],
      imports: [HttpClientModule], // Import HttpClientModule
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: mockApiService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch bike detail on initialization', () => {
    const bikeDetail = { id: 123, name: 'Test Bike' } as any;
    mockApiService.getBikeById.and.returnValue(of(bikeDetail));

    component.ngOnInit();

    expect(mockApiService.getBikeById).toHaveBeenCalledWith(123);
    expect(component.bikeDetail$).toBeTruthy();
  });
});
