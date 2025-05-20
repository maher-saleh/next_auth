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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninDto = exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Name must be at least 3 characters' }),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters' }),
    (0, class_validator_1.Matches)(/[a-zA-Z]/, { message: 'Password must contain at least one letter' }),
    (0, class_validator_1.Matches)(/[0-9]/, { message: 'Password must contain at least one number' }),
    (0, class_validator_1.Matches)(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
class SigninDto {
}
exports.SigninDto = SigninDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], SigninDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Password123!' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'Password is required' }),
    __metadata("design:type", String)
], SigninDto.prototype, "password", void 0);
//# sourceMappingURL=auth.dto.js.map