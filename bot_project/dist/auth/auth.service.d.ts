import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        username: string;
        password: string;
    }>;
    login(user: any): Promise<{
        access_token: Promise<string>;
    }>;
}
