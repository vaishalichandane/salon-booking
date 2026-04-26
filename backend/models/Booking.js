const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  email: String,
  service: String,
  price: Number,
  time: String,
  date: Date,
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: "Paid",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);