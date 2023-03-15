import { MicrosoftStrategyOptions } from './microsoft.options';
declare const MicrosoftStrategy_base: new (...args: any[]) => any;
export declare class MicrosoftStrategy extends MicrosoftStrategy_base {
    constructor(options: MicrosoftStrategyOptions);
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any>;
}
export {};
//# sourceMappingURL=microsoft.strategy.d.ts.map