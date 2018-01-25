import { Component, ElementRef, NgZone, OnDestroy, OnInit, Input } from '@angular/core';

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
                this.addScatterPlot();
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
        this.yScale.domain([this.d3.min(this.data, (d: any) => d.main.temp_max), this.d3.max(this.data, (d: any) =>  d.main.temp_min)]);

    }

    public plotLine(){
        this.svg.append("g")
        .attr("transform",
            "translate(" + this.margin.left + ",0)")
            .append("path")
        .data([this.data])
        .attr("class", "line")
        .attr("style"," fill: none;stroke: #4eaef4;stroke-width: 2px;")
        .attr("d", this.valueline);
    }

    public plotAxis(){
        // Add the X Axis
        this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left +"," + this.height + ")")
            .call(this.d3.axisBottom(this.xScale));

        // Add the Y Axis
        this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + ",0)")
            .call(this.d3.axisLeft(this.yScale));
    }

    public addScatterPlot(){
            // Add the scatterplot
            this.svg.selectAll("dot")
            .data(this.data)
            .enter().append("circle")
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
    }

    public mouseOverFn(d:any){
        this.tooltip.transition()
            .duration(200)
            .style("opacity", .9).style("left", (this.d3.event.pageX) + "px")
            .style("top", (this.d3.event.pageY - 28) + "px")
            .style("position","absolute")
            .style("background", "white")
            .style("padding", "5px")
            .style("border", "1px dashed #349ADB")
            .style("border-radius", "3px")
            .style("color", "blue");
        this.populateToolTip(d);
    }

    public populateToolTip(d:any){
        this.tooltip.html(" Max Temp -  " +d.main.temp_max+ "<br/> Min Temp -  "  +d.main.temp_min+ "<br/> Time - "+d.actualDate);
    }

    public mouseOutFn(d:any){
        this.tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
    }

 }