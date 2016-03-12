/**
 * Created by aanderson on 3/10/2016.
 */
define(function(require){
    'use strict';

    var StorageService = require('model/StorageService');
    var storageService = new StorageService();
    var CalandarService = require('Views/CalandarView');
    var calandarService = new CalandarService();


    var Task = function(){

    };

    Task.prototype.createTask = function(name, description, due, status, list){
        var Task = {
            name: name,
            description: description,
            list: list,
            date: {
                created: Date.now(),
                due: due,
                completed: status
            }
        };
        if(Task.date.due.length < 9){
            Task.date.due = calandarService.getcurrentDate();
        }
        var parsedTask =  JSON.stringify(Task);
        storageService.updateSavedInfo(name , parsedTask);
    };

    Task.prototype.createTaskList = function($newTask, taskList) {
        var taskListElement = $newTask.find('.task-list');
        for(var i = 0; i < 3; i++){
            var $taskList = $('<li></li>').text(taskList[i]);
            taskListElement.append($taskList);
        }
    };

    return Task;

});