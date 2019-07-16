const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");

const app = express();
//settings
app.set("port", process.env.PORT || 666);

//Midlewares
app.use(morgan("dev"));
app.use(express.json());
//Router
app.use("/api/tasks", require("./routes/task.route.js"));

//static files
app.use(express.static(path.join(__dirname + "/public")));
//Starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
