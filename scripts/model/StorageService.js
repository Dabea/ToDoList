/**
 * @fileOverview history View Module File
 *
 * @author Abraham Anderson
 */
define(function(require) {
    'use strict';

    var StorageService = function(){

    };

    /**
     * updateSavedInfo updates the localstorage or cookie data as changes are made
     *
     * @method updateSavedInfo
     * @param variableToUpdate
     * @param value
     */
    StorageService.prototype.updateSavedInfo = function(variableToUpdate ,value) {
        //check if localStorage is aviable
        if(typeof localStorage !== 'undefined' && localStorage !== null)
        {
            localStorage.setItem(variableToUpdate, value);
        }
        // Update the Cookie infomation
        else{
            document.cookie = variableToUpdate + '=' + value;
        }
    };

    /**
     * Gets requested infomation from either localSotrage or a cookie
     * @method  getSavedInfo
     * @param requestedInfo
     * @returns {*}
     */
    StorageService.prototype.getSavedInfo = function(requestedInfo){
        var value;
        if(typeof localStorage !== 'undefined' && localStorage !== null) {
            value =  window.localStorage[requestedInfo];
            return value;
        }else{
            value =  this.getCookieValue(requestedInfo);
            return value;
        }
    };

    /**
     * Gets requested infomation from either localSotrage or a cookie
     * @method  getSavedInfo
     * @returns {*}
     */
    StorageService.prototype.getAllSavedInfo = function(){
        var value;
        if(typeof localStorage !== 'undefined' && localStorage !== null) {
            value =  window.localStorage;
            return value;
        }else{
            value =  this.getCookieValue;
            return value;
        }
    };

    /**
     * Clears localStorage and cookie data
     * @method clearSavedData
     */
    StorageService.prototype.clearSavedData = function() {
        if(typeof localStorage !== 'undefined' && localStorage !== null) {
            window.localStorage.clear();
        }else{
            var cookieSplit = document.cookie.split(';');
            for(var i = 0; i < cookieSplit.length; i++){
                var cookieData = cookieSplit[i];
                cookieData = '';
            }
        }
    };

    /**
     * returns the Value of a requested cookie variable
     * @method getCookieValue
     * @param key
     * @returns {*}
     */
    StorageService.prototype.getCookieValue = function(key) {
        var cookieSplit = document.cookie.split(';');
        for(var i = 0; i < cookieSplit.length; i++){
            var cookieData = cookieSplit[i];
            cookieData = cookieData.replace(/\s+/g, '');
            cookieData = cookieData.split('=');
            if(cookieData[0] === key) {
                return cookieData[1];
            }
        }
    };

    StorageService.prototype.getKeyValues = function(){
        var keyValues = [];
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            var key = localStorage.key(i);
            keyValues.push(key);
        }
        return keyValues;
    };

    StorageService.prototype.deleteSavedData = function(variableToRemove){
        if(typeof localStorage !== 'undefined' && localStorage !== null)
        {
            localStorage.removeItem(variableToRemove);
        }
        // Update the Cookie infomation
        else{
            document.cookie = variableToRemove + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    };

    StorageService.prototype.changeDueDate = function(task, newDate){
       var taskObject = localStorage.getItem(task);
        try{
            var parsedTask = JSON.parse(taskObject);

            parsedTask.date.due = newDate;
            var updatedTask = JSON.stringify(parsedTask);
            this.updateSavedInfo(task , updatedTask);

        }catch(e){
            console.log('there was an error update the Task');
        }
    };

    return StorageService;

});