const express = require('express')
const cors = require('cors')


const port = process.env.PORT || 3000;

const app = express();

require('dotenv').config();
app.use(express.json())
app.use(cors());

app.get("/",function(req,res){
  return res.status(200).json({
    message:"Success"
  })
});

app.listen(port, () => {
  console.log(`Port is listening at http://localhost:${port}`)
})