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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var NestAuthTypeOrmService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAuthTypeOrmService = void 0;
const common_1 = require("@nestjs/common");
const nest_auth_service_1 = require("./nest-auth.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const nest_auth_entity_1 = require("./nest-auth.entity");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = __importDefault(require("crypto"));
let NestAuthTypeOrmService = NestAuthTypeOrmService_1 = class NestAuthTypeOrmService extends nest_auth_service_1.NestAuthService {
    constructor(nestAuthRepository, jwtService) {
        super(jwtService);
        this.nestAuthRepository = nestAuthRepository;
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.findUserByEmail(email);
        const isMatched = await NestAuthTypeOrmService_1.comparePassword(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isMatched)
            throw new common_1.BadRequestException('BAD_CREDENTIALS');
        return this.getUserWithTokens(user);
    }
    async signUp(signUpDto) {
        const { email, password } = signUpDto;
        const userExists = await this.findUserByEmail(email);
        if (userExists)
            throw new common_1.BadRequestException('ALREADY_EXISTS');
        signUpDto.password = await NestAuthTypeOrmService_1.encryptPassword(password);
        const user = await this.nestAuthRepository.create(signUpDto);
        return this.getUserWithTokens(user);
    }
    async passwordReset({ email }) {
        const user = await this.findUserByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('IS_NOT_EXISTS');
        const token = this.generateResetPasswordToken(email);
        user.resetPasswordToken = token;
        await this.nestAuthRepository.save(user);
    }
    async passwordNew({ resetPasswordToken, password, }) {
        const user = await this.nestAuthRepository.findOne({
            where: { resetPasswordToken },
        });
        const isValid = await this.verifyResetPasswordToken(user === null || user === void 0 ? void 0 : user.email, resetPasswordToken);
        if (!isValid)
            throw new common_1.BadRequestException('TOKEN_INVALID');
        user.password = await NestAuthTypeOrmService_1.encryptPassword(password);
        user.resetPasswordToken = null;
        await this.nestAuthRepository.save(user);
    }
    async strategyCallback(strategy, profile) {
        const signUpDto = await this.cleanProfilePayload(strategy, profile);
        let user = await this.findUserByEmail(signUpDto.email);
        if (!user)
            user = await this.nestAuthRepository.create(signUpDto);
        return this.getUserWithTokens(user);
    }
    async cleanProfilePayload(strategy, profile) {
        const password = crypto_1.default.randomBytes(12).toString('hex');
        return {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: await NestAuthTypeOrmService_1.encryptPassword(password),
        };
    }
    getUserWithTokens({ id, email }) {
        const payload = { id, email };
        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
            user: payload,
        };
    }
    async findUserByEmail(email) {
        return this.nestAuthRepository.findOne({
            where: { email },
        });
    }
};
NestAuthTypeOrmService = NestAuthTypeOrmService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(nest_auth_entity_1.NestAuth)),
    __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], NestAuthTypeOrmService);
exports.NestAuthTypeOrmService = NestAuthTypeOrmService;
//# sourceMappingURL=nest-auth-type-orm.service.js.map