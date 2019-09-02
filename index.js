const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 80;
const app = express();
app.use(morgan("dev"));
app.use(express.json());
try {
  mongoose.connect("mongodb://db:27017/messages", {
    useNewUrlParser: true
  });
} catch {
  console.log("db connection error");
}
const message_schema = mongoose.Schema({
  message: String,
  user: String,
  date: Date
});
const messages = mongoose.model(
  "message_collection",
  message_schema,
  "message_collection"
);

app.get("/", (req, res, next) => {
  res.send("It's running!");
});

app.get("/api/messages", (req, res) => {
  messages
    .find({})
    .sort({ date: "desc" })
    .exec((err, users) => {
      res.send(users);
    });
});

app.get("/api/messages/:number", (req, res) => {
  messages
    .find({})
    .sort({ date: "dsc" })
    .limit(req.params.number)
    .exec((err, users) => {
      res.send(users);
    });
});

app.post("/api/messages", (req, res) => {
  let message = new messages({
    message: req.body.message,
    user: req.body.user,
    date: new Date()
  });
  message.save();
  res.send("success!");
});

app.listen(PORT, () => {
  console.log(`Server started succesfully! Running on port ${PORT}`);
});
