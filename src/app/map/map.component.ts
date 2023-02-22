import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  zoom = 12;
  map: any;
  marker: any;
  hours!: any[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom
    });
  
    this.map.addListener('click', (event: any) => {
      if (this.marker) {
        this.marker.setMap(null);
      }
      this.marker = new google.maps.Marker({
        position: event.latLng,
        map: this.map
      });
  
      this.lat = event.latLng.lat();
      this.lng = event.latLng.lng();
  
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
  
      this.http.get(url).pipe(
        map((response: any) => {
          console.log(response)
          const currentWeather = response.current_weather;
          const hourlyForecast = response.hourly;
          return {
            currentTemperature: currentWeather.temperature,
            currentHumidity: currentWeather.relativehumidity_2m,
            currentWindSpeed: currentWeather.windspeed_10m,
            hourlyForecast: hourlyForecast
          };
        })
      ).subscribe((data: any) => {
        console.log(data);
        // Do something with the data
      });
    });
  }
}