const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/* =========================
   ✅ MONGODB CONNECTION
========================= */
mongoose.connect(
  "mongodb+srv://vaishalichandane543_db_user:test123@cluster0.kowcsjh.mongodb.net/salonDB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("Mongo Error ❌", err));


/* =========================
   ✅ BOOKING MODEL
========================= */
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

const Booking = mongoose.model("Booking", bookingSchema);
/* =========================
   ✅ USER SIGNUP
========================= */
app.post("/users/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists ❌" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "Signup successful ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing up" });
  }
});

/* =========================
   ✅ SAVE BOOKING (PAYMENT)
========================= */
app.post("/book", async (req, res) => {
  try {
    const { email, service, price, time, paymentMethod } = req.body;

    const newBooking = new Booking({
      email,
      service,
      price,
      time,
      paymentMethod,
      paymentStatus: "Paid",
      date: new Date(),
    });

    await newBooking.save();

    res.json(newBooking); // ✅ send data to frontend
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving booking");
  }
});


/* =========================
   ✅ GET ALL BOOKINGS (HISTORY)
========================= */
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).send("Error fetching bookings");
  }
});


/* =========================
   ✅ INVOICE PAGE (HTML)
========================= */
app.get("/invoice/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.send("Booking not found");
    }

    res.send(`
      <html>
        <head>
          <title>Invoice</title>
        </head>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Salon Invoice</h1>

          <p><b>Email:</b> ${booking.email}</p>
          <p><b>Service:</b> ${booking.service}</p>
          <p><b>Price:</b> ₹${booking.price}</p>
          <p><b>Time:</b> ${booking.time}</p>
          <p><b>Payment:</b> ${booking.paymentMethod}</p>
          <p><b>Status:</b> ${booking.paymentStatus}</p>

          <br/>

          <button onclick="window.print()">Download Invoice</button>
        </body>
      </html>
    `);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error generating invoice");
  }
});

app.get("/", (req, res) => {
  res.send("Salon Booking API is running 🚀");
});

/* =========================
   ✅ SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});