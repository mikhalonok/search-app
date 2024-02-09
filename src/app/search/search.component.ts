import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Bike } from '../interfaces/bike';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { BikeService } from '../services/bike.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  bikes: Bike[] = [];
  searchForm: FormGroup;
  currentPage = 1;
  pageSize = 10;
  showLoadMore = true;

  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private bikeService: BikeService,
    private cdr: ChangeDetectorRef,
  ) {
    this.searchForm = this.formBuilder.group({
      searchValue: [this.bikeService.currentSearchValue$.value],
    });
  }

  ngOnInit(): void {
    this.initBikes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    const searchValue = this.searchForm.get('searchValue').value;

    this.bikeService.setSearchValue(searchValue);
  }

  loadMore(): void {
    this.currentPage++;

    this.updateBikes(true);
  }

  private initBikes(): void {
    this.bikeService.currentSearchValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchForm.patchValue({ searchValue: value });
        this.updateBikes();
      });
  }

  private updateBikes(loadMore = false): void {
    const baseParams = {
      location: this.searchForm.get('searchValue').value,
      stolenness: 'proximity',
    };
    const paginationParams = {
      page: this.currentPage,
      per_page: this.pageSize,
    };
    const resultParams = loadMore
      ? { ...baseParams, ...paginationParams }
      : baseParams;

    this.apiService.searchBikes(resultParams).subscribe((bikes) => {
      this.showLoadMore = bikes.length >= this.pageSize;

      if (loadMore) {
        this.bikes = [...this.bikes, ...bikes];
      } else {
        this.bikes = bikes;
        this.currentPage = 1;
      }

      this.cdr.markForCheck();
    });
  }
}
