const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const port = 3000

dotenv.config();
app.use(express.json());
app.use(cors());
connectDB();


app.use('/api/inventory',require('./routes/InventoryRoutes'))

app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})  