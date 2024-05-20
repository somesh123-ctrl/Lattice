const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true, minlength: 10 },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, minlength: 10 },
  password: { type: String, required: true, minlength: 8, maxlength: 15 },
  photo: { type: String, required: true }, // Assuming you store the photo as a URL
  psychiatrist: { type: mongoose.Schema.Types.ObjectId, ref: "Psychiatrist" },
});

module.exports = mongoose.model("Patient", patientSchema);
