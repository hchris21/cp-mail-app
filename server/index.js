const express = require("express");
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
require("./routes/initRoutes")(app);
