const util = require("util");

const addZero = (i: number): string => {
    let result: string = i.toString();
    if (i < 10) {
        result = "0" + i;
    }
    return result;
};

enum Levels {
    "Fatal",
    "Error",
    "Warn",
    "Info",
    "Debug",
}

const Reset = "\u001b[0m";

export default class Logger {
    constructor() {}

    public Colors = {
        [Levels.Fatal]: "\u001b[41;1m",
        [Levels.Error]: "\u001b[31m",
        [Levels.Warn]: "\u001b[33m",
        [Levels.Info]: "\u001b[36;1m",
        [Levels.Debug]: "\u001b[38;5;239m",
    };

    public formatFunction: Function = (level: Levels, message: any) =>
        `${this.Colors[level]}[${Levels[level]}] (${this.formatHour(
            new Date()
        )}): ${
            typeof message !== "string" ? util.inspect(message) : message
        }${Reset}\n`;

    public formatHour(date: Date) {
        let hour = this.getHour(date);
        return `${hour.h}:${hour.m}:${hour.s}`;
    }

    public getHour(date: Date) {
        return {
            h: addZero(date.getHours()),
            m: addZero(date.getMinutes()),
            s: addZero(date.getSeconds()),
        };
    }

    public debug(message: any) {
        process.stdout.write(this.formatFunction(Levels.Debug, message));
    }
    public error(message: any) {
        process.stdout.write(this.formatFunction(Levels.Error, message));
    }
    public warn(message: any) {
        process.stdout.write(this.formatFunction(Levels.Warn, message));
    }
    public info(message: any) {
        process.stdout.write(this.formatFunction(Levels.Info, message));
    }
    public fatal(message: any) {
        process.stdout.write(this.formatFunction(Levels.Fatal, message));
    }
}
