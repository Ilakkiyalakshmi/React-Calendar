const express = require("express")
const app = express()

const cors = require("cors")

//load congig from env file
require("dotenv").config();
const port = process.env.PORT || 4000

//midlleware to parse json body
app.use(express.json())
app.use(cors())

//imports routes for calendar API CRUD
const calanderEvents = require("./routes/calanderEvents")
app.use("/api/events", calanderEvents)

const calanderUsers = require("./routes/calanderUsers")
app.use("/api/users", calanderUsers)

//start the server
app.listen(port, () => {
    console.log(`server started sucessfully at ${port}`);
})

//conect to the database
const dbConnect = require("./config/database");
dbConnect()
