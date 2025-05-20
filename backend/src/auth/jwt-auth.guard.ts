import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WinstonLogger } from '../config/winston.config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = WinstonLogger('JwtAuthGuard');

  canActivate(context: ExecutionContext) {
    this.logger.info('Checking JWT authentication');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.warn(`Authentication failed: ${info?.message || err}`);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}