import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

declare var google: any;

interface MapClickEvent extends google.maps.MapMouseEvent {
  latLng: google.maps.LatLng;
}

interface OpenMeteoResponse {
  current_weather: {
    time: string;
    temperature: number;
    weathercode: number;
    windspeed: number;
    winddirection: number;
  };
  hourly: {
    time: string[];
    windspeed_10m: number[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
  };
}

interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],
})
export class MapComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  zoom = 12;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  hours: any[] = [];
  selectedMarker!: Marker;
  showHourly = true;

  showHourlyweather() {
    this.showHourly = true;
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom,
    });

    const infowindow = new google.maps.InfoWindow();

    this.map.addListener('click', (event: MapClickEvent) => {
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.marker = new google.maps.Marker({
        position: event.latLng,
        map: this.map,
      });

      this.lat = event.latLng.lat();
      this.lng = event.latLng.lng();

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

      this.http.get<OpenMeteoResponse>(url).subscribe((data) => {
        infowindow.setContent(
          `<mat-card>
          <mat-card-title> Weather Information </mat-card-title>
          <mat-card-content>
          <p> Temperature : ${data.current_weather.temperature}</p> 
          <p> Wind Speed : ${data.current_weather.windspeed} </p>
          <button mat-raised-button color="primary" (click)="showHourlyWeather()">Show Hourly Weather </button>
          </mat-card-content>         
          </mat-card>`
        );
        infowindow.open(this.map, this.marker);
      });
    });
  }
}
