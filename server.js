const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DEBUG ENV
console.log("MONGO_URI =", process.env.MONGO_URI);

// Route test
app.get("/", (req, res) => {
    res.send("API Todo-Valk fonctionne 🚀");
});

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.log("Mongo error:", err));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});