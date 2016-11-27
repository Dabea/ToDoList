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

    CalandarTemplates.prototype.getNewTaskForm = function(date){
       var template =  "<div class='js-task-group modal-overlay  '> <div class='js-modal modal-active '><div class='pull-right js-close-modal delete-confirmation' >X</div> <div class='text-center h1'> Create a New Task!</div><div class='input-modal-group'>Add a Task <span class='js-error-task-name-location error-location col-xs-11 pull-right'></span><div class='col-xs-12 '><div class='col-xs-12 row'><input type='text' class='form-control js-task-name' ></div></div></div> <div class='input-modal-group'> Due Date <div class='col-xs-12 '> <div class='col-xs-12 row'>"+
           "<input type='date' class='form-control js-task-date' value='" + date +"'   >"+
            "</div></div> </div> <div class='input-modal-group'>Add a Description<div class='col-xs-12  '><div class='col-xs-12 row'><input type='text' class='form-control js-task-Description' ></div></div></div><div class='input-modal-group'>Add a List (Seperate List items with a comma)<div class='col-xs-12  '><div class='col-xs-12 row'><input type='text' class='form-control js-task-list' ></div></div></div><div class='col-xs-1 pull-right'><button class='btn  btn-lg btn-success js-add-click'>Add</button></div></div></div> ";
        return template;
    };

    return CalandarTemplates;
});