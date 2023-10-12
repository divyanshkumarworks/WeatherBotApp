import { UserManagementService } from '../user_management/user_management.service';
import * as mongoose from 'mongoose';
import { BotSettings } from './schemas/bot-settings.schema';
export declare class TelegramService {
    private botSettingsModel;
    private readonly userManagementService;
    private bot;
    private logger;
    private TELEGRAM_TOKEN;
    constructor(botSettingsModel: mongoose.Model<BotSettings>, userManagementService: UserManagementService);
    initializeTelegramBot(): Promise<void>;
    findLocationsForCity: (msg: any, chatId: any) => Promise<any>;
    saveUserData(user_id: string, first_name: string, last_name: string, location: string, latitude: string, longitude: string, is_block: boolean): Promise<void>;
    sendMessageToUser: (userId: string, message: string) => any;
    updateToken(newToken: string): Promise<BotSettings>;
    getApiKey(): Promise<string>;
}
