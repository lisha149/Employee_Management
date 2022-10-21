require("dotenv").config();
const express = require("express");

const db = require("./models");
const app = express();

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then((req) => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
