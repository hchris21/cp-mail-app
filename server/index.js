const express = require("express");
const db = require("./utils/database");
const config = require("./config/config");
const app = express();

app.listen(config.PORT, () => {
  console.log(`App listening at http://localhost:${config.PORT}`);
});

require("./init/initExpress")(app);
require("./init/initRoutes")(app);

module.exports = app;
