import { PassportSerializer } from '@nestjs/passport';
export declare class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: (err: any, id?: any) => void): void;
    deserializeUser(id: any, done: (err: any, user?: any) => void): void;
}
