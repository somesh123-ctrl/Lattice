const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const patientRoutes = require("./routes/patientRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const psychiatristRoutes = require("./routes/psychiatristRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api", patientRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", psychiatristRoutes);

mongoose
  .connect("mongodb://localhost:27017/psychiatristPlatform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
