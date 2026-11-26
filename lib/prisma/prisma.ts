import { PrismaClient } from "@/lib/prisma/generated/client";
import { env, loadEnv } from "@/lib/load-env";
import { PrismaPg } from "@prisma/adapter-pg";
import database from "@/workloads/main-db";
import { normalizePgUrl } from "@/lib/db-url";

loadEnv();

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter: new PrismaPg({ connectionString: normalizePgUrl(env(database.connectionStringEnvVar)) }),
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
