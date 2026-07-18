const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.get("/users", auth, async (req, res) => {
    try {
        const users = await user.find({ username: { $ne: req.user.username } }).select("username");
        res.json(users);

    } catch (err) {
        console.error("users error", err.message);
        res.status(500).json({ error: err.message });
    }
});


router.post("/users", async (req, res) => {
    try {
        const {username, password} = req.body;

        const hashed = await bcrypt.hash(password,10);

        await user.create({
            username,
            password: hashed
        });

        res.json({
            message: "user created!"
        });

    } catch (err) {
        res.status(400).json({
            error: "user already taken"
        });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password required"
            });
        }

        const userData = await user.findOne({ username });

        if (!userData) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        const match = await bcrypt.compare(password, userData.password);

        if (!match) {
            return res.status(400).json({
                error: "Wrong password"
            });
        }

        const token = jwt.sign(
            {
                id: userData._id,
                username: userData.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.json({
            token,
            username:userData.username
        });

    } catch(err) {
        console.error("Login error", err.message);

        res.status(500).json({
            error:err.message
        });
    }
});


module.exports = router;