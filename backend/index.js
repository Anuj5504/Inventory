const express = require('express');
const connectDB = require('./config/db');
const app = express()
const port = 3000

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')  
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})  