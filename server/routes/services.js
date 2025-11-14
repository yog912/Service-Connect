const express = require("express");
const Service = require("../models/Service");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const services = await Service.find({});
    return res.json(services);
  } catch (err) {
    console.error("GET /api/services ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, category, price, location } = req.body;
    const service = await Service.create({
      title,
      description,
      category,
      price,
      location,
      provider: req.user._id
    });
    return res.json(service);
  } catch (err) {
    console.error("POST /api/services ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
