define(function(require){
    'use strict';

    var TaskData = function(jasonString) {
        var parsedString = Json.parse(jasonString);
        console.log(parsedString);
        };

    return TaskData;
});

