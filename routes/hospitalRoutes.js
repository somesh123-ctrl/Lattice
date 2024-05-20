const express = require("express");
const Hospital = require("../models/Hospital");
const Psychiatrist = require("../models/Psychiatrist");
const Patient = require("../models/Patient");

const router = express.Router();

router.post("/hospitals", async (req, res) => {
  try {
    const { name } = req.body;
    const hospital = new Hospital({ name });
    await hospital.save();
    res.status(201).json(hospital);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/hospital/psychiatrists", async (req, res) => {
  try {
    const { name, hospitalId } = req.body;
    const psychiatrist = new Psychiatrist({ name, hospital: hospitalId });
    await psychiatrist.save();
    res.status(201).json(psychiatrist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/psychiatrists", async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const psychiatrists = await Psychiatrist.find({
      hospital: hospitalId,
    }).populate("hospital");
    const psychiatristDetails = await Promise.all(
      psychiatrists.map(async (psychiatrist) => {
        const patientsCount = await Patient.countDocuments({
          psychiatrist: psychiatrist._id,
        });
        return {
          id: psychiatrist._id,
          name: psychiatrist.name,
          patientsCount,
        };
      })
    );

    const totalPsychiatristsCount = psychiatrists.length;
    const totalPatientsCount = await Patient.countDocuments({
      psychiatrist: { $in: psychiatrists.map((p) => p._id) },
    });

    res.json({
      hospitalName: hospital.name,
      totalPsychiatristsCount,
      totalPatientsCount,
      psychiatristDetails,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
