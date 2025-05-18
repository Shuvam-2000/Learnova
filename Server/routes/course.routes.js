import express from "express";
import {
  createNewCourse,
  updateExisitngCourse,
  fetchCoursesCreated,
} from "../Controllers/course.controller.js";

const router = express.Router();

// creating new course route
router.post('/create-course', createNewCourse);

// updating a exisitng course
router.put('/update-course', updateExisitngCourse);

// fetching courses created by the user
router.get('/fetch-courses', fetchCoursesCreated);

export default router;
