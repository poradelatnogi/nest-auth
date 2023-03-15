import { NestAuthOptionsDto } from '../dto/nest-auth-options.dto';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor({ jwtStrategyOptions }: NestAuthOptionsDto);
    validate(payload: {
        id: string;
        email: string;
    }): {
        id: string;
        email: string;
    };
}
export {};
//# sourceMappingURL=jwt.stategy.d.ts.map