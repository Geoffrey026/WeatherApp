import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData: any = {};
  cityName: string = 'Manado';
  errorMessage: string = '';  
  currentDate: string = '';
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather(this.cityName);
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(
      data => {
        this.weatherData = data;
        this.errorMessage = '';  
      },
      error => {
        this.errorMessage = error;  
      }
    );
  }

  searchCity() {
    if (this.cityName && this.cityName.trim() !== '') {
      this.getWeather(this.cityName);
    } else {
      this.errorMessage = 'Please enter a valid city name.';
    }
  }
  updateCurrentDate() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${dayName}, ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    this.currentDate = formattedTime;
  }
}
