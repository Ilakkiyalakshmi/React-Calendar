const express = require("express");
const router = express.Router();

const {registerUser, loginUser, currentUser,getUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/current", currentUser)
router.get("/getUser", getUser)

module.exports = router     