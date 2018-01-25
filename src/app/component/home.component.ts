import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';


@Component({
  selector: "home",
  templateUrl: '../html/home.component.html',
  styleUrls : ['../styles/home.component.css'],
})

export class HomeComponent {

  constructor(public router: Router) {

  }

  private cityName: string;
  private isCitySearched: boolean = false;
  private errorMessage: string ;
  private disableSubmit :boolean = true;

  private searchForWeather(event: Event) {
    let cityNameRegex = /^[a-zA-Z]*$/;
    
    if(!cityNameRegex.test(this.cityName)){
        this.errorMessage = "City name can only contain alphabets";
        this.disableSubmit = true;
    } else {
        this.errorMessage = "";
        this.disableSubmit = false;
    }
  }

  private getWeatherForCity(){
    if(this.cityName.trim().length === 0){
       this.errorMessage = "Enter a valid city name to search";
    } else {
        this.isCitySearched = true;
        this.errorMessage = "";
        this.router.navigate(['home/' , this.cityName]);
    }
  }

}
