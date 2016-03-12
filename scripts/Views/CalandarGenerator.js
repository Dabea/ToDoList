/**
 * Created by aanderson on 3/5/2016.
 */
define(function(require){
    'use strict';
    var $ = require('jquery');
    var currentMonth;
    var currecntYear;

    var calandarGenerator = function($rootElement){
        if (!($rootElement instanceof $) && $rootElement.length !== 1) {
            throw new TypeError('The root element provided wasn\'t properly prepared');
        }
        this.init($rootElement);
    };

    calandarGenerator.prototype.init = function($rootElement){
        this.$rootElement = $rootElement;
        //this.layout($rootElement);
        this.getCurrentDates();
    };

    calandarGenerator.prototype.getCurrentDates = function(){
        var date = new Date();
    };

    calandarGenerator.prototype.getFirstDayOfMonth = function(year, month){
        var date = new Date(year,month,1);
        return date.getDay();
    };

    calandarGenerator.prototype.getcurrentDate = function(){
        var date = new Date();
        var day = date.getDate();
        console.log('The day is:' +day);
        var month = date.getMonth() +1;
        var year = date.getFullYear();
        return year + '-' + this.formatNumber(month) + '-' + this.formatNumber(day);
    };


    return calandarGenerator;
});