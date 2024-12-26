const { getCourseDetails, getAllCourses, createCourse } = require("../../controllers/courseControllers");
const { mentorAuth } = require("../../middlewares/mentorAuth");
const { upload } = require("../../middlewares/multer");

const courseRouter = require("express").Router();

courseRouter.get("/course-details/:courseId", getCourseDetails);
courseRouter.get("/get-all-courses", getAllCourses);
courseRouter.post("/create-course", mentorAuth, upload.single("image"), createCourse);
courseRouter.put("/update");

courseRouter.delete("/remove-course");

module.exports = courseRouter;
