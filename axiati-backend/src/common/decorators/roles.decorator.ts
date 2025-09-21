import { SetMetadata } from '@nestjs/common';
import { Role } from '../../modules/auth/dto/auth.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);