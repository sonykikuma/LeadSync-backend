const express = require("express");
const Lead = require("../models/Lead");
const SalesAgent = require("../models/SalesAgent");

const router = express.Router();

// creating a new lead
router.post("/", async (req, res) => {
  try {
    const { name, source, salesAgent, status, tags, timeToClose, priority } =
      req.body;

    // validating SalesAgent id
    const agentExists = await SalesAgent.findById(salesAgent);
    if (!agentExists) {
      return res
        .status(404)
        .json({ error: `Sales agent with ID '${salesAgent}' not found.` });
    }

    const lead = new Lead({
      name,
      source,
      salesAgent,
      status,
      tags,
      timeToClose,
      priority,
    });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Leads with Filtering
router.get("/", async (req, res) => {
  try {
    const { salesAgent, status, source } = req.query;
    let filter = {};

    // Filter by Sales Agent (search by name)
    if (salesAgent) {
      const agent = await SalesAgent.findOne({ name: salesAgent });
      if (agent) {
        filter.salesAgent = agent._id;
      } else {
        return res
          .status(404)
          .json({ error: `Sales agent '${salesAgent}' not found.` });
      }
    }

    // Filter by Status
    if (status) {
      filter.status = status;
    }

    // Filter by Source
    if (source) {
      filter.source = source;
    }

    const leads = await Lead.find(filter).populate("salesAgent");
    res.json(leads);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  All Leads with Optional Filtering
// router.get("/", async (req, res) => {
//   try {
//     const { salesAgent, status, tags, source } = req.query;
//     let filter = {};

//     if (salesAgent) filter.salesAgent = salesAgent;
//     if (status) filter.status = status;
//     if (tags) filter.tags = { $in: tags.split(",") };
//     if (source) filter.source = source;

//     const leads = await Lead.find(filter).populate("salesAgent");
//     res.json(leads);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Update a Lead
router.put("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead)
      return res
        .status(404)
        .json({ error: `Lead with ID '${req.params.id}' not found.` });

    Object.assign(lead, req.body);
    lead.updatedAt = Date.now();

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Lead
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead)
      return res
        .status(404)
        .json({ error: `Lead with ID '${req.params.id}' not found.` });

    res.json({ message: "Lead deleted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
