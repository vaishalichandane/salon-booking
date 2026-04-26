const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vaishalichandane543_db_user:test123@cluster0.kowcsjh.mongodb.net/salonDB");

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("DB Error ❌", error);
  }
};

module.exports = connectDB;