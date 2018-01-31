import { Component,OnInit,OnChanges,Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {GeneralConstants} from '../constants/general.constant';

import {WeatherService} from "../services/weatherservice.service";


@Component({
  selector: "weather-chart",
  templateUrl: '../html/weather.component.html',
  styleUrls : ['../styles/weather.component.css'],
})

export class ChartComponent implements OnInit {
    constructor( private route: ActivatedRoute,
        private router: Router, private weatherService: WeatherService, private generatConstants: GeneralConstants) {
          this.weatherService = weatherService;
    }
    private showLoader:boolean;
    public cityName: string;
    public errorMessage : string;
    public resultObj : any;
    public showChartFlag : boolean = false;
    public demoSelectedObj : any = this.generatConstants.DEFAULTSEARCHOBJ;
    public selectedObj : any =[];
    private showToolTipComponent : boolean = false;
    private showToolTipObj : any;
    private showToolTipSectionClass : string = this.generatConstants.DEFAULTCLASSFOROVERLAY;
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params[this.generatConstants.KEY_NAME]) { 
              this.cityName=(params[this.generatConstants.KEY_NAME]);
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
        this.resultObj = this.generatConstants.BLANKSPACE;
        this.showChartFlag = false;
        this.weatherService.getWeatherData(this.cityName)
        .subscribe(
           (result) => {
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
      let retClass: string = this.generatConstants.BLANKSPACE;
      if(objKey.toLowerCase().indexOf(this.generatConstants.KEY_TEMP) > -1){
        if(objVal < this.generatConstants.NUM_MINTEMP){
          retClass = this.generatConstants.CLASS_COLD;
        } else if(objVal > this.generatConstants.NUM_MAXTEMP){
          retClass = this.generatConstants.CLASS_HOT;
        } else{
          retClass = this.generatConstants.CLASS_NORMAL;
        }
      } else if(objKey.toLowerCase() === this.generatConstants.KEY_PRESSURE){
        retClass = this.generatConstants.CLASS_NORMAL;
      } else if(objKey.toLowerCase() === this.generatConstants.KEY_HUMIDITY){
        retClass = this.generatConstants.CLASS_NORMAL;
      } else if(objKey.toLowerCase() === this.generatConstants.KEY_WINDSPEED){
        retClass = this.generatConstants.CLASS_NORMAL;
      }

      return retClass;
    }

    private showToolTipSection(){
      if(!this.showToolTipComponent){
        if(this.showToolTipSectionClass.split(this.generatConstants.WHITESPACE).includes(this.generatConstants.OPENOVERLAYCLASS)){
          this.showToolTipSectionClass = 
            this.showToolTipSectionClass.replace(this.generatConstants.OPENOVERLAYCLASS,this.generatConstants.BLANKSPACE).trim();
        }
        if(!this.showToolTipSectionClass.split(this.generatConstants.WHITESPACE).includes(this.generatConstants.CLOSEOVERLAYCLASS)){
          this.showToolTipSectionClass +=this.generatConstants.WHITESPACE + this.generatConstants.CLOSEOVERLAYCLASS;
        }
      } else {
        if(this.showToolTipSectionClass.split(this.generatConstants.WHITESPACE).includes(this.generatConstants.CLOSEOVERLAYCLASS)){
          this.showToolTipSectionClass = 
            this.showToolTipSectionClass.replace(this.generatConstants.CLOSEOVERLAYCLASS,this.generatConstants.BLANKSPACE).trim();
        }
        if(!this.showToolTipSectionClass.split(this.generatConstants.WHITESPACE).includes(this.generatConstants.OPENOVERLAYCLASS)){
          this.showToolTipSectionClass +=this.generatConstants.WHITESPACE + this.generatConstants.OPENOVERLAYCLASS;
        }
      }
    }
}
