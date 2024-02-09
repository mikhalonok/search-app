import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bike } from '../interfaces/bike';

@Component({
  selector: 'app-bike-card',
  templateUrl: './bike-card.component.html',
  styleUrl: './bike-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeCardComponent {
  @Input() bike: Bike;
}
