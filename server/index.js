const config = require("./env");
const app = require("./app");

app.listen(config.PORT, () => {
  console.log(`App listening at http://localhost:${config.PORT}`);
});

module.exports = app;
