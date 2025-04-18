import CourseModel from "../models/courses.model";

// creating new courses
export const createNewCourse = async (req,res) => {
    try {
        
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