const mongoose = require("mongoose");

const psychiatristSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  // Add other fields as needed
});

module.exports = mongoose.model("Psychiatrist", psychiatristSchema);
