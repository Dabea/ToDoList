define(['require', 'moment' , 'TaskView'] , function(require, moment, TaskView){
    'use strict';

    var $ = require('jquery');


    // App initlization
    var App = function(){
        this.init();
    };

    App.prototype.init = function(){
       var task = new TaskView();
    };




    return App;
});