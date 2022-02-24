// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Filter from 'bad-words'
import {encrypt, decrypt, db, query} from "../../lib/db"

const filter = new Filter()

export default async function handler(req, res) {
  if(req.method === 'POST'){
    const { address} = req.body;
    try{
        const results =await  query(
          `INSERT INTO users (address) VALUES (?)`,
          [filter.clean(address)]
        );
        return res.json(results);
    }
    catch(e){
      return res.status(500).json(e);
    }
  }else if(req.method === 'GET'){
    const { address} = req.query;
    try {
      const results = await query(`
        SELECT * FROM users WHERE address = ?
        `,
        [filter.clean(address)]
      );
      return res.json(results);
    }
    catch (e) {
      return res.status(500).json(e);
    }
  }
}
