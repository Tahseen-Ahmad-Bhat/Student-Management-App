const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = 8080;
const studentRoutes = require("./routes/studentRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send(`<h1>Hello from Node.js</h1>`);
});

app.use("/student/", studentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
