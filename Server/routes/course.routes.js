import express from "express";
import {
  createNewCourse,
  updateExisitngCourse,
  fetchCoursesCreated,
  deleteCoures,
  fetchAllCourses,
} from "../Controllers/course.controller.js";
import { isUserAuthenticated } from "../middlewares/user.middleware.js";

const router = express.Router();

// creating new course route
router.post('/create-course', isUserAuthenticated, createNewCourse);

// updating a exisitng course
router.put('/update-course/:courseid', isUserAuthenticated, updateExisitngCourse);

// deleting a exisitng course
router.delete('/delete-course/:courseid', isUserAuthenticated, deleteCoures);

// fetching courses created by the user
router.get('/fetch-courses', isUserAuthenticated, fetchCoursesCreated);

// fetch all courses avaliable
router.get('/fetch-allcourses', fetchAllCourses);

export default router;
