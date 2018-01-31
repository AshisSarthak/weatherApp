import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {GeneralConstants} from '../constants/general.constant';
import {WeatherService} from "../services/weatherservice.service";

@Component({
  selector: "home",
  templateUrl: '../html/home.component.html',
  styleUrls : ['../styles/home.component.css'],
})

export class HomeComponent {

  constructor(public router: Router,private weatherSerice: WeatherService,private generalConstants: GeneralConstants) {

  }

  private cityName: string;
  private isCitySearched: boolean = false;
  private errorMessage: string ;
  private disableSubmit :boolean = true;

  private searchForWeather(event: any) {
    let cityNameRegex = /^[a-zA-Z]*$/;
    if(!cityNameRegex.test(this.cityName)){
        this.errorMessage = this.generalConstants.ERROR_CITYNAMEONLYALPHABETS;
        this.disableSubmit = true;
    } else {
        this.errorMessage = this.generalConstants.BLANKSPACE;
        this.disableSubmit = false;
    }
    if(event.keyCode === 13){
      this.getWeatherForCity();
    }
  }

  private getWeatherForCity(){
    if(this.cityName.trim().length === 0){
       this.errorMessage = this.generalConstants.ERROR_INVALIDCITYNAME;
       this.weatherSerice.setIsCitySearched(false);
    } else {
        this.weatherSerice.setIsCitySearched(true);
        this.isCitySearched = true;
        this.errorMessage = this.generalConstants.BLANKSPACE;
        this.router.navigate(['home/' , this.cityName]);
    }
  }

}
