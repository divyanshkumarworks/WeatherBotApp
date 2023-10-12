"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const moment = require("moment-timezone");
const TelegramBot = require("node-telegram-bot-api");
const user_management_service_1 = require("../user_management/user_management.service");
const axios = require("axios");
const TELEGRAM_TOKEN = "6281480925:AAGKjFhgbEWOB9nKpVZyP7wIU3wZwP_E0GU";
let MessageCronService = class MessageCronService {
    constructor(userManagementService) {
        this.userManagementService = userManagementService;
        this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });
    }
    async sendMessagesToUsers() {
        const users = await this.userManagementService.findAll();
        console.log('cron started');
        for (const user of users) {
            if (user.is_block === true) {
                continue;
            }
            const lat = user.latitude;
            const lon = user.longitude;
            let local_timezone;
            const res = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${lat},${lon}`);
            local_timezone = res.data.timezone_id;
            const localTime = moment()
                .tz(local_timezone)
                .format('HH:mm:ss');
            if (localTime === '14:07:01') {
                await this.sendMessageToUser(user);
            }
            console.log('cron ended');
        }
    }
    async sendMessageToUser(user) {
        const chatId = user.user_id;
        const location = user.location;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=26188f35379694d2b3dfe31f701c9ef2`);
            const data = response.data;
            const weather = data.weather[0].description;
            const temperature = data.main.temp - 273.15;
            const city = data.name;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const windSpeed = data.wind.speed;
            const message = `Today's weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
            this.bot.sendMessage(chatId, message);
        }
        catch (error) {
            this.bot.sendMessage(chatId, "City doesn't exist.");
        }
    }
};
exports.MessageCronService = MessageCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageCronService.prototype, "sendMessagesToUsers", null);
exports.MessageCronService = MessageCronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_management_service_1.UserManagementService])
], MessageCronService);
//# sourceMappingURL=message_cron.service.js.map