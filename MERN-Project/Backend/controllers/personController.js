const Person = require("../models/Person");

exports.addPerson = async (req, res) => {
  try {
    const person = await Person.create({
      ...req.body,
      createdBy: req.user.id 
    });

    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTree = async (req, res) => {
  try {
    const list = await Person.find({ createdBy: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
