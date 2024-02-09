// import the model 
const Events = require("../models/Events");

exports.updateEvents = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, description, start, end} = req.body;  // Corrected here

        // Check if the event belongs to the logged-in user
        const event = await Events.findOne({_id: id, user_id: req.user.id});
        if (!event) {
            return res.status(404).json({
                success: false,
                message: " You don't have permission to update this event",
            });
        }

        const updatedEvent = await Events.findByIdAndUpdate(
            {_id:id, user_id: req.user.id},
            {title, description, start, end},  
            {new: true}  
        );

        res.status(200).json(
            {
                success:true,
                data: updatedEvent, 
                message:"successfully updated"
            }
        );
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        }); 
    }
}
