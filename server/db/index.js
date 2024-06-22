const mongoose = require("mongoose");

// URbLn6tYwvMT4UFI

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://kwenait:URbLn6tYwvMT4UFI@cluster01.qiz114g.mongodb.net/")
  .then(() => console.log("Connected mongodb"))
  .catch(e => console.log(e));
