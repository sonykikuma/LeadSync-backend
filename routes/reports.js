const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

// Get Leads Closed Last Week
router.get("/last-week", async (req, res) => {
  try {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const closedLeads = await Lead.find({
      status: "Closed",
      closedAt: { $gte: lastWeek },
    }).populate("salesAgent", "name");

    res.json(closedLeads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Total Leads in Pipeline (excluding "Closed" leads)
router.get("/pipeline", async (req, res) => {
  try {
    const totalLeadsInPipeline = await Lead.countDocuments({
      status: { $ne: "Closed" },
    });

    res.json({ totalLeadsInPipeline });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get Lead Status Distribution
router.get("/status-distribution", async (req, res) => {
  try {
    const leadStatusCounts = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json(leadStatusCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
