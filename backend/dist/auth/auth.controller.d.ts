import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        message: string;
    }>;
    signin(signinDto: SigninDto): Promise<{
        token: string;
    }>;
}
