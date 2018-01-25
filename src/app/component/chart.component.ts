import { Component,OnInit,OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {WeatherService} from "../services/weatherservice.service";


@Component({
  selector: "weather-chart",
  templateUrl: '../html/weather.component.html',
  styleUrls : ['../styles/weather.component.css'],
})

export class ChartComponent implements OnInit {

    constructor( private route: ActivatedRoute,
        private router: Router, private weatherSerice: WeatherService) {

    }
    public cityName: string;
    public errorMessage : string;
    public resultObj : any;
    public showChartFlag : boolean = false;
    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params);
            if (params['name']) { 
              this.cityName=(params['name']);
              this.getCityWeather();
            }
          });
    }

    private getCityWeather(){
        this.resultObj = "";
        this.showChartFlag = false;
        this.weatherSerice.getWeatherData(this.cityName)
        .subscribe(
           (result)=>{
            this.resultObj = result;
            this.showChartFlag = true;
          },
          error =>  {
            this.errorMessage = error.error.message;
          });
    }
}
