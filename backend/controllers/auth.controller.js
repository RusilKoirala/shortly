import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';


export const registerUser = async(req,res)=> {
    const {name, email, password} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        }); 
        await newUser.save();
        res.status(201).json({message: "User registered successfully", data: newUser});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }
        const token = generateToken(res, user);
        res.status(200).json({message: "Login successful", data: user, token});
    } catch (error) {
     
        res.status(500).json({message: "Internal server error", error: error.message});
        console.log("error : ", error);
    }
}

 export const getUserProfile = async(req, res) => {
    const userId = req.user.id; // Assuming you have middleware to set req.user hehehe
    try {
        const user = await User.findById(userId).select('-password').populate('links'); // Exclude password, populate links
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User profile fetched successfully", data: user});
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
        console.log("error : ", error);
    }
}

export const logoutUser = (req, res) => {
    try{
         res.clearCookie('token'); // Clear the JWT cookie
         res.status(200).json({message: "Logout successful"});
    }catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    } 
}