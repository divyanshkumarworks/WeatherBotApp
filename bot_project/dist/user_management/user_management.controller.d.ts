import { UserManagementService } from './user_management.service';
import { User } from './schemas/user.schema';
export declare class UserManagementController {
    private userManagementService;
    constructor(userManagementService: UserManagementService);
    getAllUsers(): Promise<User[]>;
    deleteUser(id: number): Promise<void>;
    toggleBlock(id: string): Promise<User>;
}
