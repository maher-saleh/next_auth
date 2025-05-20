import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
export declare class UserService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    getProfile(userId: string): Promise<User>;
}
