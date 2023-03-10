import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { MapClickEvent, Marker, OpenMeteoResponse } from '../types/types';



declare const google: any;



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
  hours: string[] = [];
  selectedMarker!: Marker;
  showHourly = true;

  showHourlyweather() {
    this.showHourly = true;
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.mapInitializer();
  }

  openWeatherDialog(data: OpenMeteoResponse) {
    const dialogRef = this.dialog.open(WeatherInfoComponent, {
      data: {
        hourly: data.hourly,
      },
      panelClass: 'custom-dialog'
    });
    dialogRef.componentInstance.currentWeather = data.current_weather;
    dialogRef.componentInstance.hourly = data.hourly

  }
  

  mapInitializer() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom,
    });

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
        this.openWeatherDialog(data);
      });
    });
  }
}
