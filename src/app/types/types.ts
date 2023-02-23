export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  windspeed_10m: number[];
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
}

export interface MapClickEvent extends google.maps.MapMouseEvent {
  latLng: google.maps.LatLng;
}

export interface OpenMeteoResponse {
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

export interface Marker {
  lat: number;
  lng: number;
  draggable: boolean;
}
