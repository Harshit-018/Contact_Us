const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path");

const emailRouter = require("./router/emailRouter");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/email", emailRouter);

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../client/build/index.html"),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = app;
