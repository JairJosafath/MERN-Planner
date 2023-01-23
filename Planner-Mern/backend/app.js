const express = require("express");
const PORT = 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes");
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://todo-mern:ZYzKpBiM3gus3ryJ@cluster0.awmex.mongodb.net/?retryWrites=true&w=majority"
);
// mongoose.connect("mongodb://127.0.0.1:27017/todo-mern");
const database = mongoose.connection.once("open", () =>
  console.log("connected to db")
);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Get Request");
});

app.listen(PORT, (res, req) => {
  console.log(`listening on port ${PORT}`);
});
