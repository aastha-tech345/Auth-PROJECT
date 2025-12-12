const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addPerson, getTree } = require("../controllers/personController");

router.post("/", auth, addPerson);
router.get("/", auth, getTree);

module.exports = router;
