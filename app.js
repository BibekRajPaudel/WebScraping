const express = require("express");
const app = express();
cors = require("cors");
const cookieParser = require("cookie-parser");
const Router = require("./routes/apiRoutes");
const scrape = require("./routes/gateHoursRoute");

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Server started !!!!!!!!!!");
});

app.use("/api/v1/gateHours", Router);
app.use("/api/v1/crud", scrape);

module.exports = app;
