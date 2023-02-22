import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';


import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

@NgModule({
  declarations: [AppComponent, MapComponent, WeatherInfoComponent,],
  imports: [BrowserModule, AppRoutingModule, GoogleMapsModule,HttpClientModule,MatDialogModule,MatButtonModule,MatCardModule,MatListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
