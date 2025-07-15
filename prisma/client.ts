import {$Enums, PrismaClient} from '../generated/prisma'

export const prisma = new PrismaClient();
export const Status = $Enums.Status;