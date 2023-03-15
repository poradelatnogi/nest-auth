import { VerifyCallback } from 'passport-google-oauth20';
import { GoogleStrategyOptions } from './google.options';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(options: GoogleStrategyOptions);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
//# sourceMappingURL=google.strategy.d.ts.map