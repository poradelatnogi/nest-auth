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
exports.MicrosoftStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_microsoft_1 = require("passport-microsoft");
const common_1 = require("@nestjs/common");
let MicrosoftStrategy = class MicrosoftStrategy extends (0, passport_1.PassportStrategy)(passport_microsoft_1.Strategy, 'microsoft') {
    constructor(options) {
        const { clientID, clientSecret, callbackURL, tenant } = options;
        let tenantOptions = {};
        if (typeof tenant === 'string') {
            tenantOptions = {
                // [Optional] The tenant for the application. Defaults to 'common'.
                // Used to construct the authorizationURL and tokenURL
                tenant,
                // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
                authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
                // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
                tokenURL: 'https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/token',
            };
        }
        super(Object.assign({ clientID,
            clientSecret,
            callbackURL, prompt: 'select_account', scope: ['user.read'] }, tenantOptions));
    }
    async validate(accessToken, refreshToken, profile, done) {
        if (!profile)
            done('NOT_AUTHORIZED', null);
        done(null, profile);
    }
};
MicrosoftStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], MicrosoftStrategy);
exports.MicrosoftStrategy = MicrosoftStrategy;
//# sourceMappingURL=microsoft.strategy.js.map