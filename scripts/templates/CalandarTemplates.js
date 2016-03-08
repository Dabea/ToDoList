/**
 * Created by aanderson on 2/28/2016.
 */
define(function(require){
    'use strict';


   var monthList = ['January', 'February', 'March', 'April', 'May' , 'June' , 'July' , 'August' , 'Setember' , 'October' , 'November' ,'December'];

    var CalandarTemplates = function(){

    };

    CalandarTemplates.prototype.getCalandarHeader = function(){
        var calandarHeader  = "<span class='row col-xs-12'> <span class='cal-day-hd col-xs-1 cal7' >Sun</span><span class='cal-day-hd col-xs-1 cal7' >Mon</span> <span class='cal-day-hd col-xs-1 cal7' >Tue</span><span class='cal-day-hd col-xs-1 cal7' >Wed</span><span class='cal-day-hd col-xs-1 cal7' >TH</span><span class='cal-day-hd col-xs-1 cal7' >Fri</span><span class='cal-day-hd col-xs-1 cal7' >Sat</span></span>";
        return calandarHeader;
    };

    CalandarTemplates.prototype.getCalandarTitle = function(year, month){
        var selectedMonth = monthList[month];
         var calandarHeader = "<h1 class='col-xs-12'>" + "<span class='js-last-month col-xs-3 ' data-month='" + month +  "' > < </span><span class='col-xs-6'>" + selectedMonth  + '  ' + " <span class='js-year' data-year='"+ year +"'>" + year +  "</span> </span> <span class='js-next-month col-xs-3' data-month='" + month +  "' > >  </span> </h1>";
        return calandarHeader;
    };

    return CalandarTemplates;
});