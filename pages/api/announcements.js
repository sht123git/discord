// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Filter from 'bad-words'
import {encrypt, decrypt, db, query} from "../../lib/db"

const filter = new Filter()

export default async function handler(req, res) {
  if(req.method === 'POST'){
    try{
        const results =await  query( 
          `SELECT * FROM announcements WHERE server_id IN (${req.body}) ORDER BY date DESC`
        );                                                     //console.log( results);
        const up =await  query(
          `UPDATE announcements SET other="saw" WHERE server_id IN (${req.body})`          
        );     
        return res.json(results); 
    }
    catch(e){                                                               //console.log(e)
      return res.status(500).json(e);
    }
  }else if(req.method === 'GET'){
    const {id} = req.query;                                                 //console.log("id=>", req.query)
    try{
      let results=null;
      if(id == 'all')
        results =await  query(`SELECT * FROM announcements ORDER BY date DESC`);
      else
        results =await  query(`SELECT * FROM announcements WHERE id = ${id}`);
      return res.json(results);
    }
    catch(e){
      return res.status(500).json(e);
    }
  }
}
