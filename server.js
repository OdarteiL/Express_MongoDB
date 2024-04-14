if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 5000;

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "./layouts/main");

app.use(express.static("public"));
app.use(expressLayouts);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

app.use("/", indexRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
