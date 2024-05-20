const express = require("express");
const { body, validationResult } = require("express-validator");
const Psychiatrist = require("../models/Psychiatrist");

const router = express.Router();

router.post(
  "/psychiatrists",
  [body("name").notEmpty(), body("hospitalId").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, hospitalId } = req.body;
      const psychiatrist = new Psychiatrist({ name, hospital: hospitalId });
      await psychiatrist.save();
      res.status(201).json(psychiatrist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
