import CourseModel from "../models/courses.model.js";
import { v2 as cloudinary } from 'cloudinary'

// creating new courses
export const createNewCourse = async (req,res) => {
    try {
        const { courseName, courseDescription, coursePrice } = req.body

        // extract userId from middleware
        const userId = req.user?.id

         // check if all fields are provided
        if( !courseName || !courseDescription || !coursePrice ) return res.status(400).json({
            message: "All Fields Required",
            success: false
        })

        // image upload
        const { image } = req.files
        if(!req.files || Object.keys(req.files).length === 0) return res.status(400).json({
            message: 'No Image Uploaded',
        })

        // check the user has uploaded image with right format
        const allowedFormat = ["image/png", "image/jpeg"]
        if(!allowedFormat.includes(image.mimetype)) return res.status(400).json({
            message: 'Invalid File Format',
        })

        // cloudinary setup
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

        if(!cloud_response || cloud_response.error) return res.status(400).json({
            message: 'Error Uploading Image',
            success: false
        })
        
        // check if the course already exists
        const user = await CourseModel.findOne({ courseName })
        if(user) return res.status(409).json({
            message: "Course Already Exists",
            success: false
        })

        // create new course
        const course = await new CourseModel ({
            courseName,
            courseDescription,
            coursePrice,
            image:{
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url
            },
            coursecreated_by: userId
        })

        await course.save()
        res.status(201).json({
            message: `${courseName} course created successfully`,
            success: true,
            course
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// updating a existing course
export const updateExisitngCourse = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Intenral Server Error'
        })
    }
}


// fetch courses created by the user
export const fetchCoursesCreated = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Intenral Server Error'
        })
    }
}