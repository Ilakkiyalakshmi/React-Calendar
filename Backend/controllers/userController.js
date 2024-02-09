const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//register a user
const registerUser = asyncHandler(async (req, res) => {

    //check for empty values
    const { username, password, email,loginTime,logoutTime } = req.body;
    if (!username || !email || !password||!loginTime||!logoutTime) {
        res.status(400).json({
            success: false,
            message: "All fields are mandatory",
        })
    }

    //check if user already exist or not
    const userAvailable = await User.findOne({ email })

    if (userAvailable) {
        res.status(400).json({
            success: false,
            message: "User Already Exist !"
        })
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        loginTime,
        logoutTime
    });

    if (user) {
        res.status(201).json({
            success: true,
            data: user,
            message: "Successfully Registered the User",
        })
    }

    else {
        res.status(400).json({
            success: false,
            message: "User Data is not valid",
        })
    }

});


//login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "All fields are mandatory",
        })
    }

    const user = await User.findOne({ email })

    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        // {expiresIn:"30m"}
        )
        res.status(200).json({ 
            success : true,
            data: user,
            message: "User Login Sucessfull",
            Token: accessToken,
        })
    }

    else{
        res.status(400).json({
            success: false,
            message: "Email or Password is incorrect"
        })
    }
});


//current user info
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
        message: "User Data"
    })
});

const getUser = asyncHandler(async (_, res) => {
    const user=await User.find();
    res.status(200).json({
        success: true,
        data: user,
        message: "User Data"
    })
});

module.exports = { registerUser, loginUser, currentUser,getUser };


