const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code:       { type: String, required: true, unique: true, uppercase: true },
    discount:   { type: Number, required: true },   // percentage
    maxUses:    { type: Number, default: 100 },
    usedCount:  { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
