"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const telegram_module_1 = require("./telegram/telegram.module");
const input_module_1 = require("./input/input.module");
const user_management_module_1 = require("./user_management/user_management.module");
const mongoose_1 = require("@nestjs/mongoose");
const message_cron_module_1 = require("./message_cron/message_cron.module");
const auth_module_1 = require("./auth/auth.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            telegram_module_1.TelegramModule,
            input_module_1.InputModule,
            passport_1.PassportModule.register({ session: true }),
            user_management_module_1.UserManagementModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://johnybravo2404:%40bcd1234@cluster0.ikxf9ss.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
            message_cron_module_1.MessageCronModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [jwt_1.JwtService, auth_service_1.AuthService, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map