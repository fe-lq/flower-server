import { Users } from '@prisma/client';
import { PaginationParams } from './common';

export type UserParams = PaginationParams & Partial<Users>;
