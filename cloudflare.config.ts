import { defineConfig } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .env. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
	worker: {
		name: "prompt-pointer",
		compatibilityDate: "2026-10-19",
		observability: {
			enabled: true,
		},
		assets: {
			notFoundHandling: "404-page",
		},
		domains: [
			"promptpointer.dev",
		],
	},
});
