const express = require("express");

const Student = require("../models/studentModel.js");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.post("/create", async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  const newStudent = new Student({ name, email });

  await newStudent.save();

  res.json(newStudent);
});

router.get("/get", async (req, res) => {
  const students = await Student.find({});

  res.json(students);
});

router.put("/update/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const stdId = req.params.id;
    const updatedStudent = await Student.findByIdAndUpdate(
      stdId,
      { name, email },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  let id = req.params;

  id = new mongoose.Types.ObjectId(id);

  await Student.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted successfully!" });
});

module.exports = router;
