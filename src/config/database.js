import Database from 'better-sqlite3';

const db = new Database('nutrivida.sqlite');

db.pragma('foreign_keys = ON');

export default db;