import express from "express";
import {
  createNewCourse,
  updateExisitngCourse,
  fetchCoursesCreated,
} from "../Controllers/course.controller.js";
import { isUserAuthenticated } from "../middlewares/user.middleware.js";

const router = express.Router();

// creating new course route
router.post('/create-course', isUserAuthenticated, createNewCourse);

// updating a exisitng course
router.put('/update-course/:courseid', isUserAuthenticated, updateExisitngCourse);

// fetching courses created by the user
router.get('/fetch-courses', fetchCoursesCreated);

export default router;
