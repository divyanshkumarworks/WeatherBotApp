"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramModule = void 0;
const common_1 = require("@nestjs/common");
const user_management_module_1 = require("../user_management/user_management.module");
const telegram_service_1 = require("./telegram.service");
const telegram_controller_1 = require("./telegram.controller");
const bot_settings_schema_1 = require("./schemas/bot-settings.schema");
const mongoose_1 = require("@nestjs/mongoose");
let TelegramModule = class TelegramModule {
};
exports.TelegramModule = TelegramModule;
exports.TelegramModule = TelegramModule = __decorate([
    (0, common_1.Module)({
        imports: [user_management_module_1.UserManagementModule, mongoose_1.MongooseModule.forFeature([{ name: bot_settings_schema_1.BotSettings.name, schema: bot_settings_schema_1.BotSettingsSchema }])],
        providers: [telegram_service_1.TelegramService],
        controllers: [telegram_controller_1.TelegramController],
    })
], TelegramModule);
//# sourceMappingURL=telegram.module.js.map