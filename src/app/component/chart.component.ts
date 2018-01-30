import { Component,OnInit,OnChanges,Output, EventEmitter } from '@angular/core';
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
        private router: Router, private weatherService: WeatherService) {
          this.weatherService = weatherService;
    }
    private showLoader:boolean;
    public cityName: string;
    public errorMessage : string;
    public resultObj : any;
    public showChartFlag : boolean = false;
    public demoSelectedObj : any = [{
        "header" : "Temp.",
        "headerKey" : "main.temp" 
      },{
        "header" : "Temp. Max",
        "headerKey" : "main.temp_max" 
      },{
        "header" : "Temp. Min",
        "headerKey" : "main.temp_min" 
      },{
        "header" : "Pressure",
        "headerKey" : "main.pressure" 
      },{
        "header" : "Humidity",
        "headerKey" : "main.humidity" 
      },{
      "header" : "Wind Speed",
      "headerKey" : "wind.speed" 
    }];
    public selectedObj : any =[];
    private showToolTipComponent : boolean = false;
    private showToolTipObj : any;
    private showToolTipSectionClass : string = "detailedSectionWrapper";
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['name']) { 
              this.cityName=(params['name']);
              if(this.weatherService.getIsCitySearched()){
                this.getCityWeather();
              } else {
                this.router.navigate(['/']);
              }
            }
          });
    }

    public showToolTipFn (data){
      this.showToolTipObj = data;
      this.showToolTipComponent = data.showToolTipComponent;
      if(this.showToolTipComponent){
        this.selectedObj = this.demoSelectedObj;
      } else {
      }
      this.showToolTipSection();
    }

    private getCityWeather(){
        this.showLoader = true;
        this.resultObj = "";
        this.showChartFlag = false;
        this.weatherService.getWeatherData(this.cityName)
        .subscribe(
           (result)=>{
            this.resultObj = result;
            this.showChartFlag = true;
            this.showLoader = false;
          },
          error =>  {
            this.showLoader = false;
            this.errorMessage = error.error.message;
          });
    }

    private getProperColor(objKey: string, objVal: string): string {
      let retClass:string="";
      if(objKey.toLowerCase().indexOf("temp")>-1){
        if(objVal < "273"){
          retClass = "cold";
        } else if(objVal > 310){
          retClass = "hot";
        } else{
          retClass = "normal";
        }
      } else if(objKey.toLowerCase()==="pressure"){
        retClass = "normal";
      } else if(objKey.toLowerCase()==="humidity"){
        retClass = "normal";
      } else if(objKey.toLowerCase()==="wind speed"){
        retClass = "normal";
      }

      return retClass;
    }

    private showToolTipSection(){
      if(!this.showToolTipComponent){
        if(this.showToolTipSectionClass.split(" ").includes('openToolTipSection')){
          this.showToolTipSectionClass = 
            this.showToolTipSectionClass.replace('openToolTipSection','').trim();
        }
        if(!this.showToolTipSectionClass.split(" ").includes('hideToolTipSection')){
          this.showToolTipSectionClass +=" hideToolTipSection";
        }
      } else {
        if(this.showToolTipSectionClass.split(" ").includes('hideToolTipSection')){
          this.showToolTipSectionClass = 
            this.showToolTipSectionClass.replace('hideToolTipSection','').trim();
        }
        if(!this.showToolTipSectionClass.split(" ").includes('openToolTipSection')){
          this.showToolTipSectionClass +=" openToolTipSection";
        }
      }
    }
}
