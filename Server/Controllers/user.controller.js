import UserModel from "../models/user.model";
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
        const user = UserModel.findOne({ email })
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