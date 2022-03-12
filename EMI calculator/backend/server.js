import express from 'express';
import { readdirSync } from 'fs';
import cors from'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();


const app = express();
const connectToDB = async function(){
  await mongoose.connect('mongodb://localhost/users');
  console.log('Connected to DB');
}

connectToDB();



//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

//route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;
app.listen(8000, () => console.log('Server is running on port 8000'));