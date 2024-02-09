import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BikeDetail } from '../interfaces/bike';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrl: './bike-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('700ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class BikeDetailComponent implements OnInit {
  bikeDetail$: Observable<BikeDetail> = of(null);

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.bikeDetail$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.apiService.getBikeById(id)),
    );
  }
}
