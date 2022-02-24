const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
console.log({ envPath })
 
require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
      DROP TABLE IF EXISTS users
    `);
    console.log('Migration ran successfully the deleting "users" table');
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        username    TEXT NOT NULL,
        address     TEXT NOT NULL UNIQUE KEY,
        pay         TEXT NOT NULL DEFAULT "none",
        other       TEXT NOT NULL,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Migration ran successfully the creating "users" table');

    await query(`
      DROP TABLE IF EXISTS servers
    `);
    console.log('Migration ran successfully the deleting "servers" table');
    await query(`
      CREATE TABLE IF NOT EXISTS servers (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        name        TEXT NOT NULL, 
        icon_url    TEXT NOT NULL,
        other       TEXT NOT NULL
      )
    `);
    console.log('Migration ran successfully the creating "servers" table');    

    await query(`
      DROP TABLE IF EXISTS announcements
    `);
    console.log('Migration ran successfully the deleting "announcements" table');
    await query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        server_id   INT NOT NULL,
        date        DATE NOT NULL,
        time        TIME NOT NULL,
        name        TEXT NOT NULL,
        icon_url    TEXT NOT NULL, 
        content     TEXT NOT NULL,
        accessories TEXT NOT NULL,
        other TEXT NOT NULL
      )
    `);
    console.log('Migration ran successfully the creating "announcements" table');

    await query(`
      DROP TABLE IF EXISTS pins
    `);
    console.log('Migration ran successfully the deleting "pins" table');
    await query(`
      CREATE TABLE IF NOT EXISTS pins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        announcement_id INT NOT NULL,
        date DATE NOT NULL,
        other TEXT NOT NULL
      )
    `);
    console.log('Migration ran successfully the creating "pins" table');
  } 
  catch (e) {
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}
migrate().then(() => process.exit())
