import { UserManagementService } from '../user_management/user_management.service';
export declare class MessageCronService {
    private readonly userManagementService;
    private readonly bot;
    constructor(userManagementService: UserManagementService);
    sendMessagesToUsers(): Promise<void>;
    sendMessageToUser(user: any): Promise<void>;
}
