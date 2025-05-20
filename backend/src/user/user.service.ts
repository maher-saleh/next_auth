import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { WinstonLogger } from '../config/winston.config';

@Injectable()
export class UserService {
  private readonly logger = WinstonLogger('UserService');

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getProfile(userId: string): Promise<User> {
    this.logger.info(`Fetching profile for user ID: ${userId}`);
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      this.logger.warn(`User not found: ${userId}`);
      throw new Error('User not found');
    }
    return user;
  }
}