// import the modal 
const Events = require("../models/Events")

exports.deleteEvents = async(req, res) => {
    try {
        const {id} = req.params;

        // Check if the event belongs to the logged-in user
        const event = await Events.findOne({_id: id, user_id: req.user.id});
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "You don't have permission to delete this event",
            });
        }

        await Events.findByIdAndDelete({_id: id, user_id: req.user.id})

        res.status(200).json(
            {
                success:true,
                message:"Event is deleted successfully",
            }
        )
    }

    catch(err) {
        console.error(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        }); 
    }
}
