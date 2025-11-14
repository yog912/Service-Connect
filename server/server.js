const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.get("/", (req, res) => {
  res.send("Service Connect API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
