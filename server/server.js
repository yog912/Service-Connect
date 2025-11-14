const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("Service Connect API Running...");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
