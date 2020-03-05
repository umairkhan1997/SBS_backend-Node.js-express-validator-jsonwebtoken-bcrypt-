const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser')
require('dotenv').config();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded())
app.use(cors())
app.use(routes);













app.listen(8000,()=>console.log("SERVER STARTED AT PORT 8000"));