const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, "SECRET123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};
