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
            message: 'Internal Server Error',
            success: false,
        })
    }
}

// updating a existing course
export const updateExisitngCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, coursePrice } = req.body;
        const courseid = req.params.courseid;
        const userId = req.user?.id;

        if (!courseid || !userId) {
        return res.status(400).json({
            message: "Missing Course ID or User ID",
            success: false
        });
        }

        const existingCourse = await CourseModel.findById(courseid);
        if (!existingCourse) {
        return res.status(404).json({
            message: "Course Not Found",
            success: false
        });
        }

        let updatedImage = existingCourse.image;

        // Check if new image uploaded
        if (req.files && req.files.image) {
        const image = req.files.image;
        const allowedFormat = ["image/png", "image/jpeg"];

        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({
            message: "Invalid image format",
            success: false
            });
        }

        // upload new image to cloudinary
        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath);
        updatedImage = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url
        };
        }

        // upate the course info
        const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseid,
        {
            courseName,
            courseDescription,
            coursePrice,
            image: updatedImage,
            courseupdated_by: userId
        },
        { new: true }
        );

        res.status(200).json({
        message: "Course updated successfully",
        success: true,
        course: updatedCourse
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "Internal Server Error",
        success: false
        });
    }
}

// delete any course
export const deleteCoures = async (req,res) => {
    try {
        // fetching courseId rom the URL params
        const courseid = req.params.courseid;

        // deleting the required course
        const deleteCourse = await CourseModel.findByIdAndDelete(courseid)

        if(!deleteCourse) return res.status(400).json({
            message: 'Course Not Found'
        })

        res.status(200).json({
            message: `${deleteCourse.courseName} course deleted succesfully`,
            success: false
        })
        
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
        // extract userId from the middleware
        const userId = req.user?.id;
        
        if(!userId)  return res.status(400).json({
            message: "User Id not Found",
            success: false
        })

        // fetch all the courses created by the user
        const courses = await CourseModel.find({ coursecreated_by: userId }) 

        if(!courses) return res.status(400).json({
            message: "No Courses Found",
            success: false,
        })

        res.status(200).json({
            message: 'Here are your Courses',
            success: true,
            total: courses.length,
            courses
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Intenral Server Error'
        })
    }
}

// fetch all courses avaliable for all user
export const fetchAllCourses = async (req,res) => {
    try {

        // fetching courses with keyword
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {courseName:{$regex:keyword, $options: 'i'}},
                {courseDescription:{$regex:keyword, $options: 'i'}},
            ]
        }

        if (!isNaN(keyword)) {
            query.$or.push({ coursePrice: Number(keyword) });
        }

        // extract all courses from the database
        const allcourses = await CourseModel.find(query).populate({
            path: 'coursecreated_by'
        });

        // check if courses avaliable
        if(allcourses.length === 0) return res.status(404).json({
            message: 'No Courses Avaliable Now',
            success: false
        })

        res.status(201).json({
            message: 'Here are all the Courses Avaliable',
            success: true,
            allcourses
        })
        
    } catch (error) { 
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}