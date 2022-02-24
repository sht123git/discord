import mysql from 'serverless-mysql'
const CryptoJS = require('crypto-js');

export const encrypt = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

export const decrypt = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};
export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
  },
})

export async function query(q, values) {
  try {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } 
  catch (error) {
    throw(error);
  }
}
