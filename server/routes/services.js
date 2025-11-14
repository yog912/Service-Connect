const express = require("express");
const Service = require("../models/Service");
const auth = require("../middleware/auth");

const router = express.Router();

// GET services (search + limit newest 4)
router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";

    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const services = await Service.find(filter)
      .sort({ createdAt: -1 })
      .limit(4);

    return res.json(services);
  } catch (err) {
    console.error("GET /api/services ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST service (SAFE original version)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, category, price, location } = req.body;

    if (!title || !description || !category || !price || !location) {
      return res.status(400).json({ message: "Missing fields" });
    }

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
    return res.status(500).json({ message: "Failed to create service" });
  }
});

module.exports = router;
