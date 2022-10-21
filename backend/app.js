require("dotenv").config();
const express = require("express");

const db = require("./models");
const app = express();

// app.use("/user", require("./api_gateways/user_gateway"));

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port :http://localhost:${PORT}`)
  );
});
