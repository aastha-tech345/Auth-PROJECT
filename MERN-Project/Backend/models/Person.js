const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Person", default: null },
  createdBy: { type: String, required: true }
});

module.exports = mongoose.model("Person", personSchema);
