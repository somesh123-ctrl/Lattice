const express = require("express");
const { body, validationResult } = require("express-validator");
const Patient = require("../models/Patient");

const router = express.Router();

router.post(
  "/patients",
  [
    body("name").notEmpty(),
    body("address").isLength({ min: 10 }),
    body("email").isEmail(),
    body("phoneNumber").isMobilePhone(),
    body("password").isStrongPassword(),
    body("photo").notEmpty(), // Assuming photo is a URL for simplicity
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const patient = await Patient.create(req.body);
      res.status(201).json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
