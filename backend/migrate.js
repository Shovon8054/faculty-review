import mysql from "mysql2/promise";
import fs from "fs";

const connectionString = process.argv[2];

if (!connectionString) {
  console.error("❌ Error: Please provide your Aiven MySQL connection URI as an argument.");
  console.error('Usage: node migrate.js "mysql://avnadmin:your_password@host:port/defaultdb?ssl-mode=REQUIRED"');
  process.exit(1);
}

async function run() {
  console.log("Connecting to Aiven MySQL database...");
  const url = new URL(connectionString);
  const dbName = url.pathname.substring(1); // e.g. "defaultdb"

  const connection = await mysql.createConnection({
    host: url.hostname,
    port: url.port || 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: dbName,
    ssl: { rejectUnauthorized: false },
    multipleStatements: true,
  });

  console.log("Connected successfully!");

  // Step 1: Disable FK checks globally so we can drop tables in any order
  await connection.query("SET FOREIGN_KEY_CHECKS = 0;");

  // Step 2: Get ALL tables currently in the database
  const [rows] = await connection.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
    [dbName]
  );

  if (rows.length > 0) {
    const tableNames = rows.map((r) => `\`${r.table_name || r.TABLE_NAME}\``).join(", ");
    console.log(`Dropping ${rows.length} existing tables: ${tableNames}`);
    await connection.query(`DROP TABLE IF EXISTS ${tableNames};`);
    console.log("All existing tables dropped.");
  } else {
    console.log("No existing tables found. Proceeding with fresh install.");
  }

  // Step 3: Re-enable FK checks
  await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

  // Step 4: Read and clean the SQL file
  const sql = fs.readFileSync("./db.sql", "utf8");

  // Strip the DROP DATABASE / CREATE DATABASE / USE statements
  // so everything runs inside Aiven's 'defaultdb'
  const cleanedSql = sql
    .replace(/DROP DATABASE[\s\S]*?USE\s+\S+\s*;/i, "")  // remove DROP DB, CREATE DB, USE DB
    .replace(/USE\s+\S+\s*;/gi, "")                       // remove any stray USE statements
    .replace(/SET FOREIGN_KEY_CHECKS\s*=\s*0\s*;/gi, "")  // already handled above
    .replace(/SET FOREIGN_KEY_CHECKS\s*=\s*1\s*;/gi, "")  // already handled above
    .replace(/DROP TABLE IF EXISTS[^;]+;/gi, "");          // skip DROP TABLE (already dropped)

  console.log("Creating tables and seeding data...");
  await connection.query(cleanedSql);

  console.log("✅ Database migration completed successfully!");
  await connection.end();
}

run().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
