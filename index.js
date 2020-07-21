"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require('util');
var addZero = function (i) {
    var result = i.toString();
    if (i < 10) {
        result = '0' + i;
    }
    return result;
};
var Levels;
(function (Levels) {
    Levels[Levels["Fatal"] = 0] = "Fatal";
    Levels[Levels["Error"] = 1] = "Error";
    Levels[Levels["Warn"] = 2] = "Warn";
    Levels[Levels["Info"] = 3] = "Info";
    Levels[Levels["Debug"] = 4] = "Debug";
})(Levels || (Levels = {}));
var Reset = '\u001b[0m';
var Logger = /** @class */ (function () {
    function Logger(production) {
        var _a;
        var _this = this;
        if (production === void 0) { production = false; }
        this.production = false;
        this.Colors = (_a = {},
            _a[Levels.Fatal] = '\u001b[41;1m',
            _a[Levels.Error] = '\u001b[31m',
            _a[Levels.Warn] = '\u001b[33m',
            _a[Levels.Info] = '\u001b[36;1m',
            _a[Levels.Debug] = '\u001b[38;5;239m',
            _a);
        this.formatFunction = function (level, message) {
            return _this.Colors[level] + "[" + Levels[level] + "] (" + _this.formatHour(new Date()) + "): " + (typeof message !== 'string' ? util.inspect(message) : message) + Reset + "\n";
        };
        this.production = production;
    }
    Logger.prototype.formatHour = function (date) {
        var hour = this.getHour(date);
        return hour.h + ":" + hour.m + ":" + hour.s;
    };
    Logger.prototype.getHour = function (date) {
        return {
            h: addZero(date.getHours()),
            m: addZero(date.getMinutes()),
            s: addZero(date.getSeconds()),
        };
    };
    Logger.prototype.debug = function (message) {
        if (!this.production) {
            process.stdout.write(this.formatFunction(Levels.Debug, message));
        }
    };
    Logger.prototype.error = function (message) {
        process.stdout.write(this.formatFunction(Levels.Error, message));
    };
    Logger.prototype.warn = function (message) {
        process.stdout.write(this.formatFunction(Levels.Warn, message));
    };
    Logger.prototype.info = function (message) {
        process.stdout.write(this.formatFunction(Levels.Info, message));
    };
    Logger.prototype.fatal = function (message) {
        process.stdout.write(this.formatFunction(Levels.Fatal, message));
    };
    return Logger;
}());
exports.default = Logger;
