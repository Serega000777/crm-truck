import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __crmPrisma: PrismaClient | undefined;
}

export const prisma = globalThis.__crmPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__crmPrisma = prisma;
}
