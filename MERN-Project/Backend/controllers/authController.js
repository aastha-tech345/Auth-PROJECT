const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ msg: "Email already exists" });

  const hashPass = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashPass });
  res.json({ msg: "User registered", user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid email or password" });

  const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

  res.json({ msg: "Login success", token });
};
