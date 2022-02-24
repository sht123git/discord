// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Filter from 'bad-words'
import {encrypt, decrypt, db, query} from "../../lib/db"

const filter = new Filter()

export default async function handler(req, res) {
  if(req.method === 'POST'){
    const {user_id, announcement_id, pin_date} = req.body; 
    try{
        const results =await  query(
          `INSERT INTO pins (user_id, announcement_id, date) VALUES (${user_id}, ${announcement_id}, '${pin_date}')`
        );
        return res.json(results);
    }
    catch(e){console.log(e)
      return res.status(500).json(e);
    }
  }else if(req.method === 'GET'){
    const {user_id} = req.query;
    try {
      const results = await query(` SELECT * FROM pins WHERE user_id = ${user_id}`
      );
      return res.json(results);
    }
    catch (e) {
      return res.status(500).json(e);
    }
  }else if(req.method === 'PUT'){
    const {user_id, announcement_id, pin_date} = req.body;
    try{
        const results =await  query(
          `UPDATE pins SET announcement_id = '${announcement_id}', date = '${pin_date}' WHERE user_id = ${user_id}`
        );
        return res.json(results);
    }
    catch(e){
      return res.status(500).json(e);
    }
  }else if(req.method === 'DELETE'){
    const {user_id} = req.query;
    try{
        const results =await  query(
          `DELETE FROM pins WHERE user_id = ${user_id}`
        );
        return res.json(results);
    }
    catch(e){
      return res.status(500).json(e);
    }
  }
}
