import jwt from "jsonwebtoken";
import User from "./models/User.js";

const generateToken = (userId) => {
    return jwt.sign( {id: userId}, process.env.JWT_SECRET, {expiresIn: '3min'} );
};

export const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne( {email} );
        if(userExists) return res.status(400).json( {message: "User already registered with this email"} );

        const newUser = await User.create( { name, email, password } );
        res.status(201).json({
            message: "Registration Successful",
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        });
    } catch (err) {
        res.status(500).json( {message: "Registration Failed", error: err} );
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne( {email} );
        if( !user ) return res.status(404).json( {message: "User not registered"} );

        const isMatch = await user.matchPassword(password);
        if( !isMatch ) return res.status(401).json( {message: "Invalid Credentials"} );

        res.status(200).json({
            message: "Login Successful",
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json( {message: "Login Failed", error: err} );
    }
};