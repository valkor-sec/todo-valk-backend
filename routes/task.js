const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ➕ CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
    try {
        const task = new Task({
            text: req.body.text,
            user: req.user.id
        });

        await task.save();
        res.json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 📋 GET TASKS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✔ TOGGLE TASK
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        task.completed = !task.completed;

        await task.save();

        res.json(task);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ❌ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        await task.deleteOne();

        res.json({ message: "Task supprimée" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
