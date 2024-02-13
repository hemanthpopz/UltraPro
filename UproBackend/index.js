const express = require("express");
const path = require("path");
const  cors = require('cors')
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, "upro.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server Running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();



app.get('/getData',async(request,response) =>{

    const query = `SELECT * FROM upro ;`;

    const result = await db.all(query)

    response.send(result)
})


app.post('/postData', async(request,response) =>{

  const {id,title,description,category,mainDate} = request.body

  const post_query = `INSERT INTO upro(id,title,description,category,post_time)VALUES('${id}',"${title}","${description}",'${category}','${mainDate}');`;

  const result = await db.run(post_query)

  response.send('Updated Successfully')

})


app.get('/getData/:Id',async(request,response) =>{


  const {Id} = request.params

  const get_query = `SELECT * FROM upro WHERE id LIKE '${Id}'`


  const result = await db.get(get_query)

  response.send(result)

})