/**
 * Created by aanderson on 2/28/2016.
 */
define(function (require) {
    'use strict';

    var $ = require('jquery');
    var Templates = require('templates/CalandarTemplates');
    var CalandarGeneratorService = require('Views/CalandarGenerator');
    var $calandarContainer = $('.calandar-container');
    var StorageService = require('model/StorageService');
    var TemplateService = require('templates/CalandarTemplates');
    var templateService = new TemplateService();
    var storageService = new StorageService();
    var TaskService = require('model/TaskService');
    var taskService = new TaskService();
    var calandarGeneratorService = new CalandarGeneratorService($calandarContainer);
    var template = new Templates();
    var dragTaskName = '';
    var dragSrc = null;
    var numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var add = true;

    var CalandarView = function () {
        this.init();
    };

    CalandarView.prototype.init = function () {
        this.setUpHandlers();
        this.enableCalandarEvents();
        this.loadTasksToCalandar();
        this.layout();
    };

    CalandarView.prototype.setUpHandlers = function () {
        this.dragableEvent = this.dragableEvent.bind(this);
        this.dropaableLocation = this.dropaableLocation.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.enlargeDay = this.enlargeDay.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.selectedDay = this.selectedDay.bind(this);
        this.createCalandar = this.createCalandar.bind(this);
        this.reloadCalandar = this.reloadCalandar.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        //this.disableAddButton = this.disableAddButton.bind(this);
    };

    CalandarView.prototype.enableCalandarEvents = function () {
        var calandarDay = $('.cal-day');
        calandarDay.on('dragstart', this.dragableEvent);
        calandarDay.on('dragover', this.dragStart);
        calandarDay.on('drop', this.dropaableLocation);
        calandarDay.on('dblclick', this.enlargeDay);
        calandarDay.on('click', this.selectedDay);
        $('.js-calandar-task').on('dblclick', this.editEvent);
        $('.js-next-month').on('click', this.nextMonth);
        $('.js-last-month').on('click', this.lastMonth);
    };

    CalandarView.prototype.disable = function () {
        var calandarDay = $('.cal-day');
        calandarDay.off('dragstart', this.dragableEvent);
        calandarDay.off('dragover', this.dragStart);
        calandarDay.off('drop', this.dropaableLocation);
        calandarDay.off('dblclick', this.enlargeDay);
        $('.js-calandar-task').off('dblclick', this.editEvent);
    };

    CalandarView.prototype.dragableEvent = function (event) {
        dragSrc = event.target;
        dragTaskName = $(event.target).text();
    };

    CalandarView.prototype.dropaableLocation = function (event) {
        event.preventDefault();
        dragSrc.remove();
        var date = $(event.currentTarget).data('date');
        storageService.changeDueDate(dragTaskName, date);
        event.currentTarget.appendChild(dragSrc);
    };

    CalandarView.prototype.dragStart = function () {
        if ($(dragSrc).hasClass('js-calandar-task')) {
            event.preventDefault();
        }
    };

    CalandarView.prototype.selectedDay = function (event) {
        $('.cal-day-selected').removeClass('cal-day-selected');
        var $target = $(event.currentTarget);
        $target.addClass('cal-day-selected');
    };

    CalandarView.prototype.editEvent = function () {
        event.stopPropagation();
    };

    CalandarView.prototype.loadTasksToCalandar = function () {
        var calandar = $('.js-calandar');
        for (var i = 0, len2 = localStorage.length; i < len2; ++i) {
            var Task = localStorage.getItem(localStorage.key(i));
            try {
                var ParsedTask = JSON.parse(Task);
                if (ParsedTask.date.completed !== true) {
                    var wholeDate = ParsedTask.date.due;
                    var calandarBox = calandar.find('[data-date=' + wholeDate + ']');
                    var $calEvent = $("<span  class='dragable js-calandar-task col-xs-12' draggable='true'>" + ParsedTask.name + '</span>');
                    calandarBox.append($calEvent);
                }
            } catch (e) {
                console.log(e);
                storageService.deleteSavedData(Task);
                console.log('The Local Storage needed to be cleared');
            }

        }
    };
    /*  needs some clean up dudty */
    CalandarView.prototype.createCalandar = function (year, month) {
        var $jsCalandar = $('.js-calandar');
        var date = new Date();
        var day = 0;
        var firstDay = 0;
        var monthNumber = month + 1;
        monthNumber = this.formatNumber(monthNumber);
        $jsCalandar.html(template.getCalandarTitle(year, month));
        $jsCalandar.append(template.getCalandarHeader());
        for (var row = 0; row < 5; row++) {
            var $newRow = $("<span class='col-xs-12'> </span>");
            $jsCalandar.append($newRow);
            for (var dateBox = 0; dateBox < 7; dateBox++) {
                if (firstDay < calandarGeneratorService.getFirstDayOfMonth(year, month) || day >= numDaysInMonth[month]) {
                    firstDay++;
                    $newRow.append("<span class='cal-day-no col-xs-1 cal7' dragable='false' data-date='0' >" + 'n' + "</span>");
                } else {
                    day++;
                    day = this.formatNumber(day);
                    var taskDate = year + '-' + monthNumber + '-' + day;
                    $newRow.append("<span class='cal-day col-xs-1 cal7' dragable='false' data-date='" + taskDate + "' >" + day + "</span>");
                }
            }
        }
        this.enableCalandarEvents();
        this.loadTasksToCalandar();
    };

    CalandarView.prototype.reloadCalandar = function () {
        var currentMonth = $('.js-next-month').data('month');
        var currecntYear = $('.js-year').data('year');
        this.createCalandar(currecntYear, currentMonth);
    };

    CalandarView.prototype.nextMonth = function () {
        var currentMonth = $('.js-next-month').data('month');
        var newMonth;
        var currecntYear = $('.js-year').data('year');
        if (currentMonth === 11) {
            newMonth = 0;
            currecntYear = currecntYear + 1;
        } else {
            newMonth = currentMonth + 1;
        }
        /* something wrong with something.... */
        CalandarView.prototype.createCalandar(currecntYear, newMonth);
    };

    CalandarView.prototype.lastMonth = function () {
        var currentMonth = $('.js-last-month').data('month');
        var currecntYear = $('.js-year').data('year');
        var newMonth;
        if (currentMonth === 0) {
            newMonth = 11;
            currecntYear = currecntYear - 1;
        } else {
            newMonth = currentMonth - 1;
        }
        CalandarView.prototype.createCalandar(currecntYear, newMonth);
    };

    CalandarView.prototype.layout = function () {
        var date = new Date();
        this.currentMonth = date.getMonth();
        this.currecntYear = date.getFullYear();
        this.createCalandar(this.currecntYear, this.currentMonth);
    };

    CalandarView.prototype.formatNumber = function (number) {
        if (number < 10) {
            number = '0' + number;
        }
        return number;
    };

    CalandarView.prototype.getcurrentDate = function () {
        var date = new Date();
        var day = date.getDate();
        console.log('The day is:' + day);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + '-' + this.formatNumber(month) + '-' + this.formatNumber(day);
    };


    /* Not So dry Code to due to prevent circlar refrances */

    CalandarView.prototype.enlargeDay = function () {
        var $target = $(event.currentTarget);
        var date = $target.data('date');
        console.log('this is the date: ' + date);
        var formTemplate = templateService.getNewTaskForm(date);
        $('.new-task-form').append(formTemplate);
        $('.js-add-click').on('click', this.onAddButtonClick);
        //$('.task').on('click', this.onTaskClick);  ****A calandar Version will need to be added ****
        $('.js-task-name').on('input', this.checkTaskName);
        $('.js-close-modal').on('click', this.closeModal);
    };

    CalandarView.prototype.closeModal = function () {
        $('.js-task-group').remove();
    };

    CalandarView.prototype.checkTaskName = function () {
        var $taskName = $('.js-task-name');
        var $errorLocation = $('.js-error-task-name-location');
        var $addClick = $('.js-add-click');
        var taskNameToCheck = $taskName.val();
        var taskNames = storageService.getKeyValues();
        for (var i = 0; i < taskNames.length; i++) {
            if (taskNames[i] === taskNameToCheck) {
                $taskName.addClass('error-input');
                $errorLocation.html('X Task Name Allready Exisits Please Chose a new Task name');
                this.disableAddButton();
                $addClick.addClass('disabled');
                return;
            } else {
                $taskName.removeClass('error-input');
                if (!add) {
                    this.enableAddButton();
                    $addClick.removeClass('disabled');
                    $errorLocation.html('');
                }
            }
        }
    };

    CalandarView.prototype.onAddButtonClick = function () {
        var taskName = $('.js-task-name');
        var taskNameValue = taskName.val();
        var description = $('.js-task-Description');
        var descriptionValue = description.val();
        var dueDate = $('.js-task-date');
        var listSelector = $('.js-task-list');
        var listValue = listSelector.val().split(',');
        var dueDateValue = dueDate.val();
        taskService.createTask(taskNameValue, descriptionValue, dueDateValue, 'false', listValue);
        this.reloadCalandar();
        $('.js-task-group').remove();
    };

    return CalandarView;
});