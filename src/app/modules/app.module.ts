import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from '../component/app.component';
import {AngMaterialModule} from './angmaterial.module';
import {AppRoutingModule} from './approuting.module';
import {WeatherService} from '../services/weatherservice.service';
import { D3Service } from 'd3-ng2-service';


import {HomeComponent} from '../component/home.component';
import {ChartComponent} from '../component/weather.component';
import {D3graphComponent} from '../component/d3chart.component';
import {LoaderComponent} from '../component/loader.component';
import {ServiceUrls} from '../constants/serviceurl.constant';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    D3graphComponent,
    LoaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngMaterialModule,
    HttpClientModule
  ],
  providers: [WeatherService,D3Service, ServiceUrls],
  bootstrap: [AppComponent]
})
export class AppModule { }
