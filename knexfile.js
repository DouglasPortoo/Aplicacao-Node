import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname,'src','database','database.db')
  },
  pool: {
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
  },
  useNullAsDefault:true
};
