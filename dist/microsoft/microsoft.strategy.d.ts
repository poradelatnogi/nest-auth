import { NestAuthOptionsDto } from '../dto/nest-auth-options.dto';
declare const MicrosoftStrategy_base: new (...args: any[]) => any;
export declare class MicrosoftStrategy extends MicrosoftStrategy_base {
    constructor({ microsoftStrategyOptions }: NestAuthOptionsDto);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};
//# sourceMappingURL=microsoft.strategy.d.ts.map