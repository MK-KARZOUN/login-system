const express = require("express");
const cors = require("cors");
const userController = require("./controllers/user");
const meController = require("./controllers/me");

const app = express();

app.use(express.json());
app.use(cors());
app.use(userController);
app.use("/api", meController);

module.exports = app;
