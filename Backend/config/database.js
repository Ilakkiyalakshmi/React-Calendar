const mongoose = require("mongoose")

require("dotenv").config()

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB is connected Sucessfully"))
    .catch((error) =>{
        console.log("DB not Connected, ERROR")
        console.error(error.message)
        process.exit(1)
    } )
}

module.exports = dbConnect