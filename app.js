const express = require("express");
const app = express();
const routes = require('./routes/routes');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const bodyParser = require('body-parser');

const Port = process.env.PORT;

app.listen(Port, function () {
  console.log(`connected to port ${Port}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use("/api",routes);