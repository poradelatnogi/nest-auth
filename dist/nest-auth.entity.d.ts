import { UserRoles } from './enums/user-role.enum';
export declare class NestAuth {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    password: string;
    roles: UserRoles;
    resetPasswordToken?: string | null;
}
//# sourceMappingURL=nest-auth.entity.d.ts.map