import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes';


app.use(cors())
app.use(routes);













app.listen(8000,()=>console.log("SERVER STARTED AT PORT 8000"));