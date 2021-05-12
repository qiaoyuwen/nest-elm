import type { CanActivate } from '@nestjs/common';

export const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };
