const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// Get messages between two users
router.get("/:receiver", auth, async (req, res) => {
    try {
        const { receiver } = req.params;
        const sender = req.user.username;

        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


// Send message to a specific user
router.post("/", auth, async(req,res)=>{
    try {
        const { text, receiver } = req.body;

        const message = await Message.create({
            sender: req.user.username,
            receiver,
            text
        });

        res.json(message);

    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
});


module.exports = router;