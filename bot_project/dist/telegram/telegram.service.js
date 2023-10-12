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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const user_management_service_1 = require("../user_management/user_management.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const bot_settings_schema_1 = require("./schemas/bot-settings.schema");
const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");
let TelegramService = TelegramService_1 = class TelegramService {
    constructor(botSettingsModel, userManagementService) {
        this.botSettingsModel = botSettingsModel;
        this.userManagementService = userManagementService;
        this.logger = new common_1.Logger(TelegramService_1.name);
        this.findLocationsForCity = async (msg, chatId) => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${msg}&limit=0&appid=26188f35379694d2b3dfe31f701c9ef2`);
                return response.data;
            }
            catch (error) {
                return this.bot.sendMessage(chatId, "City doesn't exist.");
            }
        };
        this.sendMessageToUser = (userId, message) => {
            return this.bot.sendMessage(userId, message);
        };
        this.initializeTelegramBot();
    }
    async initializeTelegramBot() {
        this.TELEGRAM_TOKEN = await this.getApiKey();
        this.bot = new TelegramBot(this.TELEGRAM_TOKEN, { polling: true });
        const conversationState = {};
        this.bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            this.sendMessageToUser(chatId, `Hello Welcome to weather App`)
                .then(() => {
                return this.sendMessageToUser(chatId, `Please enter your location to subscribe to daily wheather updates...`);
            });
            conversationState[chatId] = { stage: 0 };
            this.bot.on('message', async (msg) => {
                const chatId = msg.chat.id;
                const first_name = msg.chat.first_name;
                const last_name = msg.chat.last_name;
                const is_block = false;
                const text = msg.text;
                if (conversationState[chatId]) {
                    const stage = conversationState[chatId].stage;
                    if (stage === 0) {
                        const matchingLocations = await this.findLocationsForCity(text, chatId);
                        if (matchingLocations.length > 1) {
                            conversationState[chatId].city = text;
                            conversationState[chatId].stage = 1;
                            let msg = `I found multiple matching locations. Please enter your state:`;
                            msg = msg + "\n";
                            for (let i = 1; i < matchingLocations.length; i++) {
                                const location = matchingLocations[i];
                                msg += `${i}. ${location.state}\n`;
                            }
                            this.bot.sendMessage(chatId, msg);
                        }
                        else if (matchingLocations.length === 1) {
                            conversationState[chatId].city = text;
                            const location = text;
                            const lat = matchingLocations.lat;
                            const lon = matchingLocations.lon;
                            this.bot.sendMessage(chatId, `Thank you! You entered:\nCity: ${conversationState[chatId].city}`);
                            await this.saveUserData(chatId, first_name, last_name, location, lat, lon, is_block);
                            delete conversationState[chatId];
                        }
                        else {
                            this.bot.sendMessage(chatId, 'Sorry, I couldn\'t find a matching location. Please try again.');
                        }
                    }
                    else if (stage === 1) {
                        const matchingLocations = await this.findLocationsForCity(conversationState[chatId].city, chatId);
                        const filteredlocation = matchingLocations.find(location => location.state === text);
                        console.log(filteredlocation);
                        if (!filteredlocation) {
                            console.log(`No matching location found for state: ${text}`);
                        }
                        const location = filteredlocation.name;
                        const lat = filteredlocation.lat;
                        const lon = filteredlocation.lon;
                        console.log(`Latitude: ${typeof (lat)}, Longitude: ${typeof (lon)}`);
                        this.bot.sendMessage(chatId, `Thank you! You entered:\nCity: ${conversationState[chatId].city}\nState: ${conversationState[chatId].state}`);
                        await this.saveUserData(chatId, first_name, last_name, location, lat, lon, is_block);
                        delete conversationState[chatId];
                    }
                }
            });
        });
    }
    async saveUserData(user_id, first_name, last_name, location, latitude, longitude, is_block) {
        await this.userManagementService.saveUser(user_id, first_name, last_name, location, latitude, longitude, is_block);
    }
    async updateToken(newToken) {
        const updatedBotSettings = await this.botSettingsModel.findOneAndUpdate({}, { botApiKey: newToken }, { new: true, upsert: true });
        return updatedBotSettings;
    }
    async getApiKey() {
        const botSettings = await this.botSettingsModel.findOne().exec();
        if (botSettings) {
            return botSettings.botApiKey;
        }
        return '';
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bot_settings_schema_1.BotSettings.name)),
    __metadata("design:paramtypes", [mongoose.Model, user_management_service_1.UserManagementService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map