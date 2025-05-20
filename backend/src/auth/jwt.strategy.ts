import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from '../config/winston.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = WinstonLogger('JwtStrategy');

  constructor(
    private authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
    });
  }

  async validate(payload: { userId: string; email: string }) {
    this.logger.info(`Validating JWT for user: ${payload.email}`);
    const user = await this.authService.validateUser(payload.userId);
    return { userId: user._id, email: user.email };
  }
}