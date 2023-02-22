import { Component, Input } from '@angular/core';

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  windspeed_10m: number[];
}


export interface CurrentWeather {
  temperature: number;
  windspeed: number;
}

@Component({
  selector: 'app-weather-info',
  template: `
    <mat-card>
      <mat-card-title> Weather Information </mat-card-title>
      <mat-card-content>
        <p>Temperature : {{ currentWeather.temperature }}</p>
        <p>Wind Speed : {{ currentWeather.windspeed }}</p>
        <button mat-raised-button (click)="toggleHourly()">
          Show Hourly Weather
        </button>
        <div *ngIf="showHourly">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
                <th>Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let hour of hourly.time; let i = index">
                <td>{{ hour | date : 'shortTime' }}</td>
                <td>{{ hourly.temperature_2m[i] }}</td>
                <td>{{ hourly.windspeed_10m[i] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class WeatherInfoComponent {
  @Input() hourly!: HourlyWeather;
  @Input() currentWeather!: CurrentWeather;
  hours: any[] = [];
  showHourly = false;

  toggleHourly() {
    this.showHourly = !this.showHourly;
  }

  ngOnChanges() {}
}
