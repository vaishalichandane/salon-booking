const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ BOOK SLOT
router.post("/book", async (req, res) => {
  try {
    const { email, service, price, date, time, paymentMethod } = req.body;

    // 🔥 CHECK IF SLOT ALREADY BOOKED
    const existing = await Booking.findOne({ date, time });

    if (existing) {
      return res.json({ message: "Slot already booked ❌" });
    }

    const booking = new Booking({
      email,
      service,
      price,
      date,
      time,
      paymentMethod,
      paymentStatus: "Paid",
    });

    await booking.save();

    res.json({ message: "Booking Successful ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error booking service" });
  }
});


// ✅ GET ALL BOOKINGS (for history)
router.get("/all", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

module.exports = router;