import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto/auth.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private readonly logger;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signup(signupDto: SignupDto): Promise<void>;
    signin(signinDto: SigninDto): Promise<{
        token: string;
    }>;
    validateUser(userId: string): Promise<User>;
}
