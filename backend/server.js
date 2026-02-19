const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

// Model
const Registration = mongoose.model("Registration", registrationSchema);

// Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    await Registration.create({ name, email, phone });

    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});