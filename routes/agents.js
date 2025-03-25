const express = require("express");
const SalesAgent = require("../models/SalesAgent");

const router = express.Router();

// Create a New Sales Agent
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          error: "Invalid input: 'email' must be a valid email address.",
        });
    }

    // Check if email already exists
    const existingAgent = await SalesAgent.findOne({ email });
    if (existingAgent) {
      return res
        .status(409)
        .json({ error: `Sales agent with email '${email}' already exists.` });
    }

    const agent = new SalesAgent({ name, email });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Sales Agents
router.get("/", async (req, res) => {
  try {
    const agents = await SalesAgent.find();
    res.json(agents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
