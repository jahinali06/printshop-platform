// Runs a project-local PostgreSQL server for development (no system install needed).
// Data lives in packages/database/.local-db (gitignored) and persists between runs.
// Usage: pnpm --filter @printshop/database db:local   (Ctrl+C to stop)
import EmbeddedPostgres from 'embedded-postgres';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const databaseDir = join(here, '..', '.local-db');
const port = Number(process.env.LOCAL_DB_PORT ?? 5432);
const dbName = 'printshop';

const pg = new EmbeddedPostgres({
  databaseDir,
  user: 'postgres',
  password: 'postgres',
  port,
  persistent: true,
});

const firstRun = !existsSync(join(databaseDir, 'PG_VERSION'));
if (firstRun) {
  console.log(`Initialising new local database cluster in ${databaseDir} ...`);
  await pg.initialise();
}

await pg.start();

if (firstRun) {
  await pg.createDatabase(dbName);
}

console.log(`Local PostgreSQL ready on port ${port}`);
console.log(`DATABASE_URL="postgresql://postgres:postgres@localhost:${port}/${dbName}?schema=public"`);
console.log('Press Ctrl+C to stop.');

let stopping = false;
const shutdown = async () => {
  if (stopping) return;
  stopping = true;
  console.log('Stopping local PostgreSQL ...');
  await pg.stop();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Keep the process alive while the server runs.
setInterval(() => {}, 1 << 30);
