import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ServiceUrls} from '../constants/serviceurl.constant';

@Injectable()
export class WeatherService {

  constructor (private http: HttpClient, private serviceUrls: ServiceUrls) {}

  getWeatherData(targetCity:any):  Observable<any> {
    return this.http.get(this.serviceUrls.callWeatherUrl + targetCity + this.serviceUrls.API_KEY)
                    .map(this.extractData)
  }

  public commonHttpGetMethod(url: string){
          return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
  }

  public commonHttpOtherMethod(payLoad : any , url : string, httpType : string){
    if(httpType === "post"){
      return this.http.post(url, payLoad )
                      .map(this.extractData)
                      .catch(this.handleError);
    } else if (httpType === "put"){
      return this.http.put(url, payLoad )
                      .map(this.extractData)
                      .catch(this.handleError);
    }

  }


  private extractData(res: Response) {
    return res;
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
