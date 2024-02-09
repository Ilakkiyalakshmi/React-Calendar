// Import the models
const Events = require("../models/Events");
const Users = require("../models/Users"); 

exports.createEvents = async (req, res) => {
    try {
        const { title, description, start, end, visibility, selectedUsers } = req.body;
      
        // If visibility is not provided, set it to the creator's user ID
        let visibilitySetting;
       // const userIds = await getUserIds(selectedUsers);
      const userIds=selectedUsers.map((a)=>a._id)
        // Combine the creator's ID and the selected users' IDs
        console.log(selectedUsers,'kkkk')
        visibilitySetting = !userIds? [req.user.id] : [req.user.id, ...userIds];
      
        const eventData = {
          title,
          description,
          start,
          end,
          user_id: req.user.id,
          visibility: visibilitySetting,
        };
      
        // Create a new event object and insert it into the database
        const response = await Events.create(eventData);
      
        // Send a JSON response with a success flag
        res.status(200).json({
          success: true,
          data: response,
          message: "Successfully created an event",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Error creating event",
        });
      }
      
      async function getUserIds(selectedUsers) {
        const userPromises = selectedUsers.map(async (username) => {
          const user = await Users.findOne({ username });
          console.log(typeof(user._id,"aaa"))
          return (user._id).toString();
        });
      
        return await Promise.all(userPromises);
      }
      
};
