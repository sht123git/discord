// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Filter from 'bad-words'
import {encrypt, decrypt, db, query} from "../../lib/db"

const filter = new Filter()

export default async function handler(req, res) {
  if(req.method === 'GET'){
    try {
      const results = await query(`SELECT * FROM servers`);
      return res.json(results);
    }
    catch (e) {
      return res.status(500).json(e);
    }
  }
}
