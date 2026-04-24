const express = require("express");
const Payment = require("../models/Payments");
const Coupon  = require("../models/Coupon");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET all payments
router.get("/", protect, async (req, res) => {
  try {
    const payments = await Payment.find().populate("user", "name email").populate("course", "title");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create payment
router.post("/",  async (req, res) => {
  const { user, course, amount, couponCode, method } = req.body;
  try {
    let discount = 0;
    let couponUsed = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (!coupon) return res.status(400).json({ message: "Invalid or expired coupon" });
      if (new Date() > coupon.expiryDate) return res.status(400).json({ message: "Coupon expired" });
      if (coupon.usedCount >= coupon.maxUses) return res.status(400).json({ message: "Coupon limit reached" });
      discount = coupon.discount;
      couponUsed = coupon.code;
      await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });
    }

    const finalAmount = amount - (amount * discount) / 100;
    const payment = await Payment.create({ user, course, amount: finalAmount, coupon: couponUsed, discount, status: "completed", method });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE payment
router.delete("/:id", protect, async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
