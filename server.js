require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DEBUG ENV
console.log("MONGO_URI =", process.env.MONGO_URI);

// Test route
app.get("/", (req, res) => {
    res.send("API Todo-Valk fonctionne 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.log("Mongo error:", err));

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
