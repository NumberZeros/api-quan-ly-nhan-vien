require("dotenv").config();
const port = process.env.PORT_DEV || 9000;
const dbRetryTime = process.env.RETRY_TIME || 2000;
const MONGO_PORT = 27017;

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./services/router");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
console.log("moi truong ", process.env.NODE_ENV);

//connection string
const mongoUri = `mongodb+srv://lse-gen:hien00000@cluster0.dydgg.mongodb.net/project_two?retryWrites=true&w=majority`;
const mongoUriDev = `mongodb+srv://lse-gen:hien00000@cluster0.dydgg.mongodb.net/project_two?retryWrites=true&w=majority`;

let db = mongoose.connection;
let connectWithRetry = function () {
  if (process.env.NODE_ENV == "dev") {
    console.log(mongoUriDev);
    return mongoose.connect(mongoUriDev, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
  console.log(mongoUri);
  return mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

connectWithRetry().then();

db.on("error", () => {
  setTimeout(() => {
    console.log("DB connection failed. Will try again.");

    connectWithRetry();
  }, dbRetryTime);
});

db.on("connected", function () {
  console.log("connected");
  app.use(router);

  app.listen(port, () => console.log(`All set up. Listening on ${port}!`));
});
