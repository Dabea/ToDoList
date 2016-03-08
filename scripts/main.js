
requirejs.config({
    baseUrl: 'scripts',

    paths: {
        'jquery': 'lib/jquery-2.1.3',
        'moment': 'lib/moment',
        'TaskView': 'Views/TaskView'
    },

    shims: {
        jquery:{
            exports: 'jQuery'
        }
    },

    urlArgs: 'v=1.0.0&cb=' + (new Date().getTime())

});

require(['jquery' ,'App'], function($ , App){
    'use strict';
    $(document).ready(function(){

       var app = new App();




    });

});