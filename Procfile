# Lifecycle processes read by monolayer (https://app.monolayer.dev/docs/platform/procfile)
# Apply Prisma migrations on first deploy and on every deploy after, before the new version serves traffic.
createDatabase: npm run db:deploy
migrateDatabase: npm run db:deploy
