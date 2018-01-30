import { Component, ElementRef, NgZone, OnDestroy, OnInit, Input, EventEmitter , Output } from '@angular/core';

import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

@Component({
  selector: 'app-d3graph',
  template: '',
  styleUrls : ['../styles/d3chart.component.css']
})

export class D3graphComponent implements OnInit {
  
    @Input('plotData') plotData: any;
    @Output()
    showToolTipE: EventEmitter<String> = new EventEmitter<String>();
   
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;

  private self = this;
    private d3ParentElement: any;
    private svg: any;
    private margin: any = {top: 20, right: 50, bottom: 30, left: 50};
    private width : any = 960 - this.margin.left - this.margin.right;
    private height: any = 500 - this.margin.top - this.margin.bottom;
    private xScale: any;
    private yScale: any;
    private valueline : any ;
    // parse the date / time
    private parseTime : any;
    private data:any;
    private tooltip:any;
    private path:any;

  constructor(element: ElementRef, private ngZone: NgZone, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

    ngOnInit(){
        this.parseTime =  this.d3.isoParse;
        if (this.parentNativeElement !== null) {
                this.tooltip = this.d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                this.plotSvgFirst();
                this.setsetScale();
                this.setLinePath();
                this.formatData();
                this.setDomain();
                this.plotLine();
                this.plotAxis();
                this.adjustTicks();
                this.animateThePlot();
                setTimeout(()=>{
                    this.addScatterPlot();
                },2050);
        }
    }
    public plotSvgFirst(): void {
        this.svg = this.d3.select(this.parentNativeElement)
        .append('svg')        // create an <svg> element
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .attr("style","margin:10px");
    }

    public setsetScale(): void {
        // set the ranges
        this.xScale = this.d3.scaleTime().range([0, this.width]);
        this.yScale = this.d3.scaleLinear().range([this.height, 0]);
    }

    public setLinePath(){
            // define the line
            this.valueline = this.d3.line()
            .x((d: any) =>    this.xScale(d.dt_txt))
            .y((d: any) => this.yScale(d.main.temp));
    }

    public formatData(){
        this.data = this.plotData.list;
        // format the data
        this.data.forEach((d: any) => {
            d.actualDate = d.dt_txt;
            d.dt_txt = +this.parseTime(d.dt_txt);
        });

    }

    public setDomain(){
        // Scale the range of the data
        this.xScale.domain(this.d3.extent(this.data, (d: any) => (d.dt_txt)));
        this.yScale.domain([this.d3.min(this.data, (d: any) => d.main.temp_max - 20), this.d3.max(this.data, (d: any) =>  d.main.temp_min + 20)]);

    }

    public plotLine(){
        this.path = this.svg.append("g")
        .attr("transform",
            "translate(" + this.margin.left + ",0)")
            .append("path")
        .data([this.data])
        .attr("class", "line")
        .attr('class', 'guide')
        .attr("style"," fill: none;stroke: #4eaef4;stroke-width: 2px;")
        .attr("d", this.valueline);
    }

    public plotAxis(){
        // Add the X Axis
        this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left +"," + this.height + ")")
            .call(this.d3.axisBottom(this.xScale).tickSize(0)
            .tickPadding(2));

        // Add the Y Axis
        this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + ",0)")
            .call(this.d3.axisLeft(this.yScale)
            .tickSize(0)
            .tickPadding(2));
    }

    public adjustTicks(){
        this.d3.selectAll(".tick")
        .attr("style","font-family:Arial;font-size: 12px;opacity:0.7;");

        // text label for the x axis
        this.svg.append("text")
            .attr("transform",
            "translate(" + (this.width/2) + " ," + 
                        (this.height + this.margin.top + 20) + ")")
            .attr("style","text-anchor:middle;fill:#777;")
            .text("Date");

    // text label for the y axis
    this.svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - (this.height / 2))
        .attr("dy", "1em")
        .attr("style","text-anchor:middle;fill:#777;")
        .text("Temp");
    }

    public animateThePlot(){
        let totalLength = this.path.node().getTotalLength();
        this.path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease(this.d3.easeBackInOut)
          .attr("stroke-dashoffset", 0);
    }

    public addScatterPlot(){
            // Add the scatterplot
            let dots = this.svg.selectAll(".dot")
            .data(this.data)
            .enter().append("circle")
            .attr("class","dot")
            .attr("r", 5)
            .attr("style","fill:#095b96;cursor:pointer;")
            .attr("transform","translate(" + this.margin.left + ",0)")
            .attr("cx", (d: any) => this.xScale(d.dt_txt))
            .attr("cy", (d: any) => this.yScale(d.main.temp))
            .on("mouseover", (d: any) => {
                this.mouseOverFn(d)
            })
            .on("mouseout", (d: any) => {
                this.mouseOutFn(d);
            });

            this.d3.selectAll(".dot").transition()
            .duration(5000)
            .ease(this.d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    }

    public mouseOverFn(d:any){
        this.showToolTip(true,d);
    }

    public showToolTip(flag:boolean,data:any){
        this.showToolTipE.emit(this.populateThrowObject(flag,data)); //emmiting the event.
    }

    public mouseOutFn(d:any){
        this.showToolTip(false,d);
    }

    public populateThrowObject(flag:boolean,data:any){
        let throwObj : any = {};
        throwObj["showToolTipComponent"] = flag;
        throwObj["main.temp"] = data.main.temp;
        throwObj["main.temp_max"] = data.main.temp_max;
        throwObj["main.temp_min"] = data.main.temp_min;
        throwObj["main.pressure"] = data.main.pressure;
        throwObj["main.humidity"] = data.main.humidity;
        throwObj["wind.speed"] = data.wind.speed;
        return throwObj;
    }

 }