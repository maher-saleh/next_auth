"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const winston_config_1 = require("../config/winston.config");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = (0, winston_config_1.WinstonLogger)('AuthService');
    }
    async signup(signupDto) {
        this.logger.info(`Attempting signup for email: ${signupDto.email}`);
        const { email, name, password } = signupDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            this.logger.warn(`User already exists: ${email}`);
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ email, name, password: hashedPassword });
        await user.save();
        this.logger.info(`User created successfully: ${email}`);
    }
    async signin(signinDto) {
        this.logger.info(`Attempting signin for email: ${signinDto.email}`);
        const { email, password } = signinDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            this.logger.warn(`User not found: ${email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.logger.warn(`Invalid password for email: ${email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ userId: user._id, email: user.email });
        this.logger.info(`User signed in successfully: ${email}`);
        return { token };
    }
    async validateUser(userId) {
        this.logger.info(`Validating user with ID: ${userId}`);
        const user = await this.userModel.findById(userId);
        if (!user) {
            this.logger.warn(`User not found: ${userId}`);
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map