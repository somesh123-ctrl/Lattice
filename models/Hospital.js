const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Add other fields as needed
});

module.exports = mongoose.model("Hospital", hospitalSchema);
