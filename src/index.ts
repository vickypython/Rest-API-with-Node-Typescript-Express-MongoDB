import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);
server.listen(3000, () => {
  console.log("server started running on http://locahost:3000");
});
const MONGO_URL =
'mongodb+srv://vickymlucky:vicky@cluster0.xaqfsym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
// mongoose.connection.on("err", (error: Error) => {
//   console.log(error);
// });
const db = mongoose.connection

db.on('error',(error:Error) =>console.error(error))
db.once('open', () => console.log('connected to database'))