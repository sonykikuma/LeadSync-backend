const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const TagMp2 = mongoose.model("TagMp2", tagSchema);
module.exports = TagMp2;
