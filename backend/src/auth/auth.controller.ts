import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signup(@Body() signupDto: SignupDto) {
    await this.authService.signup(signupDto);
    return { message: 'User created successfully' };
  }

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}