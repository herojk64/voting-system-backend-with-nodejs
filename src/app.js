const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();
app.use(express.json())
app.use(cors());


const candidatesRoute = require('./routes/candidates');
const userRoute = require('./routes/user');

app.use("/candidates",candidatesRoute);
app.use("/user",userRoute);
app.use('/voting',candidatesRoute)

const port = process.env.PORT || 5000;
const mongodb_connection_string = process.env.MONGODBCONNECTION || "mongodb://127.0.0.1:27017/voting-app";


app.listen(port, () => {
  console.log(`Port is listening at http://localhost:${port}`)
})
mongoose.connect(mongodb_connection_string)
  .then(() => console.log('Connected!'));
// module.exports = { app };