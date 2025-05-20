import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private readonly logger;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: {
        userId: string;
        email: string;
    }): Promise<{
        userId: any;
        email: string;
    }>;
}
export {};
