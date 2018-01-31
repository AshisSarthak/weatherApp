export class GeneralConstants {
    //Urls
    public URL_HOME: string = 'home/';
    public URL_DEFAULT: string = 'home/';

    //Errors
    public ERROR_INVALIDCITYNAME : string = "Enter a valid city name to search";
    public ERROR_CITYNAMEONLYALPHABETS : string = "City name can only contain alphabets";

    //Constants for search Object
    public DEFAULTSEARCHOBJ: any[]=  [{
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


    //JSON Keys
    public KEY_NAME: string = 'name';
    public KEY_TEMP: string = 'temp';
    public KEY_PRESSURE: string = 'pressure';
    public KEY_HUMIDITY: string = 'humidity';
    public KEY_WINDSPEED: string = 'wind speed';

    //overlay number classes
    public CLASS_NORMAL:string = 'normal';
    public CLASS_HOT: string = 'hot';
    public CLASS_COLD:string = 'cold';

    //Class constants for tooltip over lay
    public DEFAULTCLASSFOROVERLAY: string = 'detailedSectionWrapper';
    public OPENOVERLAYCLASS: string = 'openToolTipSection';
    public CLOSEOVERLAYCLASS: string = 'hideToolTipSection';

    //Misc

    public WHITESPACE: string = " ";
    public BLANKSPACE: string = '';
    public NUM_MAXTEMP: string = '310';
    public NUM_MINTEMP: string = '273';
}