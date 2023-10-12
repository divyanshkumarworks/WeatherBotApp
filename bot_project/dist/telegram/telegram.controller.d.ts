import { TelegramService } from './telegram.service';
export declare class TelegramController {
    private telegramService;
    constructor(telegramService: TelegramService);
    getAllUsers(): Promise<string>;
    updateApiKey(data: {
        newApiKey: string;
    }): Promise<void>;
}
