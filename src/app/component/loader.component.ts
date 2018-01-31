import { Component,OnInit,Inject,Input } from '@angular/core';
import { Router } from '@angular/router';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: '../html/loader.component.html',
  styleUrls : ['../styles/loader.component.css']
})

export class LoaderComponent implements OnInit{
  private color: any = 'primary';
  private mode: any = 'indeterminate';
  private value: any = 70;
  @Input() isInnerLoader;
  private innerLoaderFlag : boolean;

  ngOnInit(){
    this.innerLoaderFlag = this.isInnerLoader;
  }
}
