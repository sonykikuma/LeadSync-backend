const express = require("express");
const CommentMp2 = require("../models/CommentMp2");
const Lead = require("../models/Lead");

const router = express.Router();

// Add a Comment to a Lead
router.post("/:id/comments", async (req, res) => {
  try {
    const { commentText, author } = req.body;

    // Validate input
    if (!commentText || typeof commentText !== "string") {
      return res.status(400).json({
        error: "Invalid input: 'commentText' is required and must be a string.",
      });
    }

    // Check if the Lead exists
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res
        .status(404)
        .json({ error: `Lead with ID '${req.params.id}' not found.` });
    }

    const comment = new CommentMp2({
      commentText,
      author,
      lead: req.params.id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Comments for a Lead
router.get("/:id/comments", async (req, res) => {
  try {
    // Check if the Lead exists
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res
        .status(404)
        .json({ error: `Lead with ID '${req.params.id}' not found.` });
    }

    const comments = await CommentMp2.find({ lead: req.params.id }).populate(
      "author",
      "name"
    );
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
