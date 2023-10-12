import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleLoginCallback(req: any, res: any): "No user from google" | {
        message: string;
        user: any;
    };
}
