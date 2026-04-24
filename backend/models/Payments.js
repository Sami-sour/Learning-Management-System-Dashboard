const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course:   { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amount:   { type: Number, required: true },
    coupon:   { type: String, default: null },
    discount: { type: Number, default: 0 },
    status:   { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
    method:   { type: String, default: "Manual" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", paymentSchema);
