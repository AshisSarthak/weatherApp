// Import our dependencies
import { Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import {HomeComponent} from '../component/home.component';
import {ChartComponent} from '../component/weather.component';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  {path: 'home/:name',      component: ChartComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
