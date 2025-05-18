import CourseModel from "../models/courses.model.js";

// creating new courses
export const createNewCourse = async (req,res) => {
    try {
        const { courseName, courseDescription, coursePrice, image } = req.body

        // check if all fields are provided
        if( !courseName || !courseDescription || !coursePrice ) return res.status(400).json({
            message: "All Fields Required",
            success: false
        })

        // create new course
        const course = new CourseModel ({
            courseName,
            courseDescription,
            coursePrice,
            image
        })

        await course.save()
        res.status(201).json({
            message: `${courseName} course created successfully`,
            success: true
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