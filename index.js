const express = require('express')


const port = process.env.PORT || 3000;

const app = express();

require('dotenv').config();
app.use(express.json())

app.listen(port, () => {
  console.log(`Port is listening at http://localhost:${port}`)
})