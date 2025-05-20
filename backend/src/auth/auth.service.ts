import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { WinstonLogger } from '../config/winston.config';

@Injectable()
export class AuthService {
  private readonly logger = WinstonLogger('AuthService');

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    this.logger.info(`Attempting signup for email: ${signupDto.email}`);
    const { email, name, password } = signupDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`User already exists: ${email}`);
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, name, password: hashedPassword });
    await user.save();
    this.logger.info(`User created successfully: ${email}`);
  }

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    this.logger.info(`Attempting signin for email: ${signinDto.email}`);
    const { email, password } = signinDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.warn(`User not found: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user._id, email: user.email });
    this.logger.info(`User signed in successfully: ${email}`);
    return { token };
  }

  async validateUser(userId: string): Promise<User> {
    this.logger.info(`Validating user with ID: ${userId}`);
    const user = await this.userModel.findById(userId);
    if (!user) {
      this.logger.warn(`User not found: ${userId}`);
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}