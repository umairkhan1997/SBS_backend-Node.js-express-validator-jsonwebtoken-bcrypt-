const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');


app.use(cors())
app.use(routes);













app.listen(8000,()=>console.log("SERVER STARTED AT PORT 8000"));