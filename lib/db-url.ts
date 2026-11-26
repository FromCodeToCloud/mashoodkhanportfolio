/**
 * Normalizes a Postgres connection string so strict URL parsers (Prisma CLI,
 * pg-connection-string) accept it.
 *
 * In production, monolayer may put an RDS IAM auth token in the password slot.
 * Those tokens contain raw ":", "/", "?", "&" and "=" characters; left
 * unencoded, Prisma fails with "P1013: invalid port number in database URL".
 * This URL-encodes the user and password only when they contain such characters.
 */
const RESERVED = /[:/?#[\]@&=+ ]/;

function encodeIfRaw(part: string): string {
	return RESERVED.test(part) ? encodeURIComponent(part) : part;
}

export function normalizePgUrl(raw: string): string {
	const schemeEnd = raw.indexOf("://");
	if (schemeEnd === -1) return raw;
	const scheme = raw.slice(0, schemeEnd);
	const rest = raw.slice(schemeEnd + 3);
	const at = rest.lastIndexOf("@");
	if (at === -1) return raw;

	const creds = rest.slice(0, at);
	const hostPart = rest.slice(at + 1);
	const colon = creds.indexOf(":");
	const user = colon === -1 ? creds : creds.slice(0, colon);
	const password = colon === -1 ? undefined : creds.slice(colon + 1);

	const encodedCreds =
		password === undefined ? encodeIfRaw(user) : `${encodeIfRaw(user)}:${encodeIfRaw(password)}`;
	return `${scheme}://${encodedCreds}@${hostPart}`;
}

/** Describes a connection string's shape for logs without revealing secrets. */
export function describePgUrl(raw: string): string {
	try {
		const schemeEnd = raw.indexOf("://");
		const rest = raw.slice(schemeEnd + 3);
		const at = rest.lastIndexOf("@");
		const creds = at === -1 ? "" : rest.slice(0, at);
		const password = creds.includes(":") ? creds.slice(creds.indexOf(":") + 1) : "";
		const u = new URL(normalizePgUrl(raw));
		return JSON.stringify({
			scheme: raw.slice(0, schemeEnd),
			host: u.hostname,
			port: u.port || "(default)",
			database: u.pathname.slice(1),
			query: [...u.searchParams.keys()],
			passwordLength: password.length,
			passwordHadRawReservedChars: RESERVED.test(password),
		});
	} catch (err) {
		return `unparseable even after normalizing: ${(err as Error).message}`;
	}
}
