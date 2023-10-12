import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UserManagementService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User[]>;
    deleteUser(id: string): Promise<User | null>;
    saveUser(user_id: string, first_name: string, last_name: string, location: string, latitude: string, longitude: string, is_block: boolean): Promise<User>;
    toggleBlock(id: string): Promise<User>;
}
