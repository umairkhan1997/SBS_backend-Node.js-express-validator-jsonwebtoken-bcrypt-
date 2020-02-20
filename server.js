const express = require(express)
const app = express;
const cors = require('cors')
import routess from './routes';


app.use(cors())
app.use(routess);













app.listen(8000,()=>console.log("SERVER STARTED AT PORT 8000"));