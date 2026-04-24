const express = require("express");
const Coupon = require("../models/Coupon");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET all coupons
router.get("/", protect, async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create coupon
router.post("/", protect, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT toggle active
router.put("/:id", protect, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE coupon
router.delete("/:id", protect, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST validate coupon (public)
router.post("/validate", async (req, res) => {
  const { code } = req.body;
  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon || new Date() > coupon.expiryDate || coupon.usedCount >= coupon.maxUses)
      return res.status(400).json({ message: "Invalid or expired coupon" });
    res.json({ discount: coupon.discount, message: `${coupon.discount}% discount applied!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
