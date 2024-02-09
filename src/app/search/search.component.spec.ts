import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { SearchComponent } from './search.component';
import { BikeService } from '../services/bike.service';
import { ApiService } from '../services/api.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let bikeServiceSpy: jasmine.SpyObj<BikeService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const bikeServiceSpyObj = jasmine.createSpyObj('BikeService', [
      'setSearchValue',
      'currentSearchValue$',
    ]);
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', [
      'searchBikes',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        { provide: BikeService, useValue: bikeServiceSpyObj },
        { provide: ApiService, useValue: apiServiceSpyObj },
      ],
    }).compileComponents();

    bikeServiceSpy = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    // @ts-ignore
    bikeServiceSpy['currentSearchValue$'] = new BehaviorSubject<string>('');
    apiServiceSpy.searchBikes.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with current search value from bike service', () => {
    const searchValue = 'test value';
    // @ts-ignore
    bikeServiceSpy['currentSearchValue$'] = new BehaviorSubject<string>(
      searchValue,
    );

    component.ngOnInit();

    expect(component.searchForm.get('searchValue').value).toBe(searchValue);
  });

  it('should set search value when form is submitted', () => {
    const searchValue = 'test value';
    const formValue = { searchValue };
    component.searchForm.patchValue(formValue);

    component.onSubmit();

    expect(bikeServiceSpy.setSearchValue).toHaveBeenCalledWith(searchValue);
  });

  it('should update bikes list when initBikes is called', () => {
    const searchValue = 'test value';
    const bikes = [
      { id: 1, name: 'Bike 1' },
      { id: 2, name: 'Bike 2' },
    ];
    const apiResponse = of(bikes) as any;
    // @ts-ignore
    bikeServiceSpy['currentSearchValue$'] = new BehaviorSubject<string>(
      searchValue,
    );
    apiServiceSpy.searchBikes.and.returnValue(apiResponse);

    component.ngOnInit();

    expect(apiServiceSpy.searchBikes).toHaveBeenCalledWith({
      location: searchValue,
      stolenness: 'proximity',
    });
    expect(component.bikes as any).toEqual(bikes);
  });

  it('should update bikes list when loadMore is called', () => {
    const initialBikes = [
      { id: 1, name: 'Bike 1' },
      { id: 2, name: 'Bike 2' },
    ];
    const additionalBikes = [
      { id: 3, name: 'Bike 3' },
      { id: 4, name: 'Bike 4' },
    ];
    const combinedBikes = [...initialBikes, ...additionalBikes] as any;
    const apiResponse = of(additionalBikes) as any;
    component.bikes = initialBikes as any;
    component.currentPage = 1;
    apiServiceSpy.searchBikes.and.returnValue(apiResponse);

    component.loadMore();

    expect(apiServiceSpy.searchBikes).toHaveBeenCalledWith({
      location: component.searchForm.get('searchValue').value,
      stolenness: 'proximity',
      page: 2,
      per_page: 10,
    });
    expect(component.bikes).toEqual(combinedBikes);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
