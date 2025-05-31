import CourseModel from "../models/courses.model.js";

// creating new courses
export const createNewCourse = async (req,res) => {
    try {
        const { courseName, courseDescription, coursePrice, image } = req.body

        // extract userId from middleware
        const userId = req.user?.id

        // check if all fields are provided
        if( !courseName || !courseDescription || !coursePrice ) return res.status(400).json({
            message: "All Fields Required",
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
            image,
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