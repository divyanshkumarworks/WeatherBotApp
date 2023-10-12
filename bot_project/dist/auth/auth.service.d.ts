export declare class AuthService {
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
    };
}
