const express = require("express");
const db = require("./utils/database");
const config = require("./config/config");
const app = express();

app.listen(config.PORT, () => {
  console.log(`App listening at http://localhost:${config.PORT}`);
});

require("./routes/initRoutes")(app);

db.sequelize.sync().then(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection established.");
  } catch (err) {
    console.error("Unable to connect to the db.", err);
  }
});
