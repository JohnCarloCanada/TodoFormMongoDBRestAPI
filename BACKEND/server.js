require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("listening on port 3000"));
  } catch (error) {
    console.error(error);
  }
};
connectToMongoDB();

const todoRouter = require("./routes/todo");
app.use("/todo", todoRouter);
