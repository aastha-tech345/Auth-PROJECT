const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/person", require("./routes/personRoutes"));

app.listen(5000, () => console.log("Server running on 5000"));
