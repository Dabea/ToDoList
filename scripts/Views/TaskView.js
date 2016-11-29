define(function (require) {

    var $ = require('jquery');
    var StorageService = require('model/StorageService');
    var storageService = new StorageService();
    var moment = require('moment');
    var TemplateService = require('templates/CalandarTemplates');
    var templateService = new TemplateService();
    var CalandarView = require('Views/CalandarView');
    var TaskService = require('model/TaskService');
    var taskService = new TaskService();
    var calandarService = new CalandarView();
    var add = true;

    var TaskView = function () {
        this.init();
    };

    TaskView.prototype.init = function () {
        //storageService.clearSavedData();
        this.layout();
        this.setUpHandlers();
        this.enable();
        this.restoreTaks();
        var test = storageService.getAllSavedInfo();
    };

    TaskView.prototype.layout = function () {
        var day = moment().add(7, 'days');
        day = day.format('dddd MMMM Do YYYY');
        $('.js-list').html('Still working hard ' + day);
    };

    TaskView.prototype.setUpHandlers = function () {
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onTaskClick = this.onTaskClick.bind(this);
        this.onTaskCompleteClick = this.onTaskCompleteClick.bind(this);
        this.showNewTaskMenu = this.showNewTaskMenu.bind(this);
        this.checkTaskName = this.checkTaskName.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.undo = this.undo.bind(this);
        this.completeTasks = this.completeTasks.bind(this);
        this.selectTaskDisplayType = this.selectTaskDisplayType.bind(this);
        this.deleteAnimation = this.deleteAnimation.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.hambergerMenu = this.hambergerMenu.bind(this);
    };

    TaskView.prototype.enable = function () {
        $('.js-add-click').on('click', this.onAddButtonClick);
        $('.js-add').on('click', this.showNewTaskMenu);
        $('.task-container').on('click', '.task .js-checkbox', this.onTaskCompleteClick);
        $('.js-task-name').on('input', this.checkTaskName);
        $('.js-close-modal').on('click', this.closeModal);
        $('.undo').on('click', this.undo);
        $('.js-complete').on('click', this.completeTasks);
        $('.js-list-selector ').on('click', this.selectTaskDisplayType);
        $('.del-wrapper').on('click', this.deleteAnimation);
        $('.js-confirm-delete-btn').on('click', this.deleteTask);
        $('.js-hamberger').on('click', this.hambergerMenu);
        $('.js-task-wrapper').on('click', '.task', this.onTaskClick);
    };

    TaskView.prototype.disable = function () {
        $('.js-add-click').off('click', this.onAddButtonClick);
        $('.js-add').off('click', this.showNewTaskMenu);
        $('.task-container').off('click', '.task .js-checkbox', this.onTaskCompleteClick);
        $('.js-task-name').off('input', this.checkTaskName);
        $('.js-close-modal').off('click', this.closeModal);
        $('.undo').off('click', this.undo);
        $('.js-complete').off('click', this.completeTasks);
        $('.js-list-selector ').off('click', this.selectTaskDisplayType);
        $('.delete-confirmation').off('click', this.deleteAnimation);
        $('.js-confirm-delete-btn').off('click', this.deleteTask);
        $('.js-hamberger').on('click', this.hambergerMenu);
    };

    TaskView.prototype.hambergerMenu = function () {
        $('.container').toggleClass('hambergler-menu');
    };

    TaskView.prototype.disableAddButton = function () {
        $('.js-add-click').off('click', this.onAddButtonClick);
        add = false;
    };

    TaskView.prototype.enableAddButton = function () {
        $('.js-add-click').on('click', this.onAddButtonClick);
        add = true;
    };

    TaskView.prototype.enableDeleteAnimation = function () {
        $('.delete-confirmation').on('click', this.deleteAnimation);
    };


    TaskView.prototype.disableDeleteAnimation = function () {
        $('.delete-confirmation').off('click', this.deleteAnimation);
    };


    TaskView.prototype.createChirdlren = function () {

    };

    TaskView.prototype.deleteAnimation = function (event) {
        var $target = $(event.currentTarget);
        $('.js-confirm-delete-btn').on('click', this.deleteTask);
        $target.toggleClass('isanimateing');

        event.stopPropagation();
    };

    /**
     * Gathers the infomation from the form and sends it for the task to be created
     */
    TaskView.prototype.onAddButtonClick = function () {
        var taskName = $('.js-task-name');
        var taskNameValue = $('.js-task-name').val();
        var description = $('.js-task-Description');
        var descriptionValue = description.val();
        var dueDate = $('.js-task-date');
        var listSelector = $('.js-task-list');
        var listValue = listSelector.val().split(',');
        var dueDateValue = dueDate.val();
        this.createNewTaskForm(taskNameValue, dueDateValue, descriptionValue, listValue);
        $('.js-js-task-group').remove();
    };

    /**
     * Enables the task items and descriptions to be shown when clicked
     */
    TaskView.prototype.onTaskClick = function () {
        var $target = $(event.target);
        if ($(event.target).is('.js-checkbox') || $(event.target).is('.check')) {
            return;
        }
        $target.toggleClass('task-selected');
        $target.find('.task-list').toggleClass('task-item-hidden');
    };

    TaskView.prototype.closeModal = function () {
        $('.js-task-group').remove();
    };

    /**
     * This will create the form for the user to imput the new task
     * @param taskName
     * @param dueDate
     * @param taskDescription
     * @param taskList
     */
    TaskView.prototype.createNewTaskForm = function (taskName, dueDate, taskDescription, taskList) {
        var $newTask = $('.task-template').clone();
        $newTask.find('.task-name').html(taskName);
        $newTask.find('.task-date').html(dueDate);
        $newTask.removeClass('task-template');
        var deleteConfirmation = $newTask.find('.delete-confirmation');
        var taskListElement = $newTask.find('.task-list');
        var $taskDescription = $('<span></span>').text(taskDescription);
        taskListElement.html($taskDescription);
        deleteConfirmation.on('click', this.deleteAnimation);
        taskService.createTaskList($newTask, taskList);
        $('.task-container').append($newTask);
        $('.js-task-group').remove();
        taskService.createTask(taskName, taskDescription, dueDate, 'false', taskList);
    };

    /**
     * This will recreate the task and move it to the complete task
     * @param taskName
     * @param dueDate
     * @param taskDescription
     * @param taskList
     */
    TaskView.prototype.moveToCompletedTask = function (taskName, dueDate, taskDescription, taskList) {
        var $newTask = $('.task-template-completed').clone();
        $newTask.find('.task-name').html(taskName);
        $newTask.find('.task-date').html(dueDate);
        $newTask.removeClass('task-template-completed');
        var taskListElement = $newTask.find('.task-list');
        var $taskList = $('<li></li>').text(taskList);
        var $taskDescription = $('<li></li>').text(taskDescription);
        var status = true;
        var undoBtn = $newTask.find('.undo');
        var deleteConfirmation = $newTask.find('.delete-confirmation');
        deleteConfirmation.on('click', this.deleteAnimation);
        taskListElement.html($taskDescription);
        taskListElement.append($taskList);
        undoBtn.on('click', this.undo);
        $('.task-container-completed').append($newTask);
        taskService.createTask(taskName, taskDescription, dueDate, status, taskList);
    };

    TaskView.prototype.selectTaskDisplayType = function (event) {
        var $target = $(event.target).closest('li');
        var active = $target.data('list') + '-active';
        var warpper = $('.js-task-wrapper');
        warpper.removeClass('task-active complete-active both-active calandar-active');
        warpper.addClass(active);
    };

    TaskView.prototype.onTaskCompleteClick = function (event) {
        event.stopPropagation();
        var $target = $(event.currentTarget);
        var checkbox = $target;
        var check = $target.find('.check');
        checkbox.toggleClass('circle-checkbox-complete');
        check.toggleClass('check-complete');
        this.updateTaskStatus($target);
    };

    TaskView.prototype.showNewTaskMenu = function (date) {
        if (typeof undefined) {
            date = calandarService.getcurrentDate();
        }
        var formTemplate = templateService.getNewTaskForm(date);
        $('.new-task-form').append(formTemplate);
        $('.js-add-click').on('click', this.onAddButtonClick);
        $('.task-container').on('click', '.task .js-checkbox', this.onTaskCompleteClick);
        $('.js-task-name').on('input', this.checkTaskName);
        $('.js-close-modal').on('click', this.closeModal);

    };

    TaskView.prototype.undo = function (event) {
        event.stopPropagation();
        var $target = $(event.currentTarget);
        $target.parent().fadeOut('slow', (function () {
            $target.text('edit');
            $target.removeClass('undo').addClass('edit');
            $target.off('click', this.undo);
            var checkbox = $target.parent().find('.js-checkbox');
            checkbox.removeClass('circle-checkbox-complete-previously');
            var check = checkbox.find('.check');
            check.removeClass('check-complete');
            $('.task-container').append($target.parent().fadeIn('slow'));
            this.updateTaskStatus($target);
        }).bind(this));
    };

    /**
     * Add Fade out and in animation
     * Change Text to Undo and Add undo class and attach lisner
     */
    TaskView.prototype.completeTasks = function () {
        var completedCheckBox = $('.task-container').find('.circle-checkbox-complete');
        completedCheckBox.removeClass('circle-checkbox-complete');
        completedCheckBox.addClass('circle-checkbox-complete-previously');
        var completedTasks = completedCheckBox.parent();
        completedTasks.fadeOut('slow', (function () {
            var edit = completedTasks.find('.edit');
            edit.text('undo');
            edit.on('click', this.undo);
            $('.task-container-completed').append(completedTasks.fadeIn('slow'));
            edit.removeClass('edit').addClass('undo');
        }).bind(this));
    };

    TaskView.prototype.updateTaskStatus = function ($target) {
        var checkbox = $target.parent().find('.js-checkbox');
        var check = checkbox.find('.check');
        var taskName = $target.parent().find('.task-name').text();
        var taskStorage = storageService.getSavedInfo(taskName);
        var parsedStorage = JSON.parse(taskStorage);
        var completedState = (check.hasClass('check-complete'));
        parsedStorage.date.completed = completedState;
        taskStorage = JSON.stringify(parsedStorage);
        storageService.updateSavedInfo(taskName, taskStorage);
    };

    TaskView.prototype.deleteTask = function () {
        event.stopImmediatePropagation();
        var $target = $(event.currentTarget);
        var $taskRow = $target.closest('.delete-confirmation').parent();
        var name = $taskRow.find('.task-name').text();
        storageService.deleteSavedData(name);
        $taskRow.remove();


    };

    /* this should be moved to storage? */
    TaskView.prototype.restoreTaks = function () {
        for (var i = 0, len2 = localStorage.length; i < len2; ++i) {
            var Task = localStorage.getItem(localStorage.key(i));
            var ParsedTask = JSON.parse(Task);
            if (ParsedTask.date.completed === true) {
                this.moveToCompletedTask(ParsedTask.name, ParsedTask.date.due, ParsedTask.description, ParsedTask.list);
            } else {
                this.createNewTaskForm(ParsedTask.name, ParsedTask.date.due, ParsedTask.description, ParsedTask.list);
            }
        }
    };

    /**
     * This removes completed Tasks Permently
     * move to Task-Baised file? ** Name will likey change as well
     *
     * @method removeCheckedOffTasks
     */
    TaskView.prototype.removeCheckedOffTasks = function (name) {
        localStorage.removeItem(name);
    };
    /**
     * This Checks to see if the Task Name is allready Taken
     * @method checkTaskName
     */
    TaskView.prototype.checkTaskName = function () {
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


    return TaskView;

});