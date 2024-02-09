// import the modal 
const Events = require("../models/Events")

exports.getEvents = async (req, res) => {
    try {
        // Fetch all events visible to the user or created by the user from DB
        console.log(req.user)
        const events = await Events.find({
            $or: [
                { visibility: "all" },
                { visibility: req.user.id },
                { user_id: req.user.id }
            ]
        });

        // Response
        console.log(events)
        res.status(200).json({
            success: true,
            data: events,
            message: "All events data are fetched"
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};

exports.getEventsById = async (req, res) => {
    try {
        // Extract event based on id
        const id = req.params.id;
        const EventData = await Events.findOne({
            _id: id,
            $or: [
                { visibility: "all" },
                { visibility: req.user.id },
                { user_id: req.user.id }
            ]
        });

        // Data with the given id not found
        if(!EventData) {
            return res.status(404).json({
                success: false,
                message: "Data not found for the given id",
            });
        }

        return res.status(200).json({
            success: true,
            data: EventData,
            message: "Data for the given id is successfully fetched"
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message
        });
    }
};
