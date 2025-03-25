const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesAgent",
    required: true,
  },
  commentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const CommentMp2 = mongoose.model("CommentMp2", commentSchema);
module.exports = CommentMp2;
