/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { Configuration } from "@monolayer/sdk";

const config: Configuration = {
	workloadsPath: "./workloads",
	// Local Postgres on 5442 (5432/5433 are already in use on this machine)
	containers: {
		postgresDatabase: {
			exposedPorts: [{ container: 5432, host: 5442 }],
		},
	},
};

export default config;
