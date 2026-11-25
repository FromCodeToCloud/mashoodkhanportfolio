import { loadEnvConfig } from "@next/env";

/**
 * Loads environment variables from .env files in the project directory.
 * It utilizes the Next.js `loadEnvConfig` utility to load the environment variables.
 * @see https://nextjs.org/docs/app/guides/environment-variables#environment-variable-load-order
 */
export function loadEnv() {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
}

/**
 * Retrieves the value of an environment variable.
 * @param name The name of the environment variable.
 * @returns The value of the environment variable.
 *
 * @throws A {@link MissingEnvironmentVariable} error when the environment variable is not set.
 *
 */
export function env(name: string) {
	const envVar = process.env[name];
	if (envVar === undefined) {
		throw new Error(`${name} environment variable is not set`);
	}
	return envVar;
}

/**
 * Error class for missing environment variables.
 */
export class MissingEnvironmentVariable extends Error {}
