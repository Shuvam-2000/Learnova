import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    courseName:{
        type: String,
        required: true
    },
    courseDescription:{
        type: String,
        required: true
    },
    coursePrice:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        default: ""
    },
    coursecreated_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }

}, {timestamps: true})


const CourseModel = mongoose.model('Course', CourseSchema);

export default CourseModel;