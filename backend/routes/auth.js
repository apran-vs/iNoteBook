const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// creat a User using: POST "/api/auth". no login required
router.post(
    "/createuser",
    [
        body("name", "Enter a valid Name").isLength({ min: 3 }),
        body("email", "Enter a valid Email").isEmail(),
        body("password", "Password must be atleast 8 character").isLength({
            min: 8,
        }),
    ],
    async (req, res) => {
        // If there are errors, return the Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({
                        error: "Sorry a user with this email already exists",
                    });
            }
            // create a user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            res.json(user);
        }// catch a error 
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured!");
        }
    }
);

module.exports = router;
