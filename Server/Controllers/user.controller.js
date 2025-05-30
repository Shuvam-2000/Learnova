import UserModel from "../models/user.model.js";
import { configDotenv } from "dotenv";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Load Environment Variables
configDotenv()

// new user creation
export const newUser = async (req,res) => {
    try {
        const { fullname, email, password, phoneNumber } = req.body

        if(!fullname || !email || !password || !phoneNumber) return res.status(404).json({
            message: "All Fields Required",
            success: false
        }) 

        // check if the user already exists
        const user = await UserModel.findOne({ email })
        if(user) return res.status(409).json({
            message: "User Already Exists",
            success: false
        })

        // register user if new user
        const newUser = await UserModel ({
            fullname,
            email,
            password,
            phoneNumber
        })

        // hashing the password securly
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save()
        res.status(201).json({
            message: `Welcome ${fullname}`,
            success: true
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// user login
export const userLogin = async (req,res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) return res.status(404).json({
            message: 'All fields are rquired',
            success: false
        })

        // validating the email
        const userLogin = await UserModel.findOne({ email })
        if(!userLogin) res.status(400).json({
            message: 'Incorrect Email',
            success: false
        })

        // validating the password
        const isPasswordEqual = await bcrypt.compare(password, userLogin.password)
        if(!isPasswordEqual) res.status(400).json({
            message: "Password don't match",
            success: false
        })
        
        // intialize jwtToken for the user
        const jwtToken = jwt.sign({
            email: userLogin.email,
            id: userLogin._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'})

        // set the token to HTTP-only cookie
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

         res.status(200).json({
            message: `Hi ${userLogin.fullname}`,
            user: userLogin,
            success: true
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Intenral Server Error',
            success: false
        })
    }
}

export const userProfileUpdate = async (req, res) => {
    try {
        // Fields to be updated
        const { updates } = req.body;

        // Extract user ID from request parameters
        const userid = req.params.userid; 

        if (!userid) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        if (!updates) {
            return res.status(400).json({
                message: "No update fields provided",
                success: false
            });
        }

        // Update the user profile info for given fields
        const user = await UserModel.findByIdAndUpdate(userid, { $set: updates }, { new: true });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            });
        }

        res.status(200).json({
            message: "Profile Updated Successfully",
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// user logout
export const userLogout = async(req,res) => {
    // clear the cookie when user logs out 
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ 
        message: 'Logged Out Successfully' });
};