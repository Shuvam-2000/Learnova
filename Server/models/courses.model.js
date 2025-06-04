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
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    coursecreated_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    courseupdated_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },

}, {timestamps: true})


const CourseModel = mongoose.model('Course', CourseSchema);

export default CourseModel;