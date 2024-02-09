const express = require("express");
const router = express.Router();

//import controller for CRUD
const {createEvents} = require("../controllers/createEvents")
const {getEvents, getEventsById} = require("../controllers/getEvents")
const {updateEvents} = require("../controllers/updateEvents")
const {deleteEvents} = require("../controllers/deleteEvents");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);

//define API routes for CRUD
router.post("/createEvents", createEvents)
router.get("/getEvents", getEvents)
router.get("/getEventsById/:id", getEventsById)
router.patch("/updateEvents/:id", updateEvents)
router.delete("/deleteEvents/:id", deleteEvents)

module.exports = router