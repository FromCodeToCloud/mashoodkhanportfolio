import path from "node:path";
import { defineConfig } from "prisma/config";
import { env, loadEnv } from "./lib/load-env";
import database from "./workloads/main-db";
import { describePgUrl, normalizePgUrl } from "./lib/db-url";

loadEnv();

const rawDbUrl = env(database.connectionStringEnvVar);
console.log(`[db-url] ${database.connectionStringEnvVar}: ${describePgUrl(rawDbUrl)}`);

const prismaPath = path.join("lib", "prisma");

export default defineConfig({
	schema: prismaPath,
	migrations: {
		path: path.join(prismaPath, "migrations"),
		seed: `tsx ${path.join(prismaPath, "seed.ts")}`,
	},
	datasource: {
		url: normalizePgUrl(rawDbUrl),
	},
});
