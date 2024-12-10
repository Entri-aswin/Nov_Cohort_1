const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Course } = require("../model/courseModel");

const getAllCourses = async (req, res) => {
    try {
        const courseList = await Course.find().select("title price image");

        res.status(200).json({ message: "course list fetched", data: courseList });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        const courseDetails = await Course.findById(courseId).populate("mentor");

        res.status(200).json({ message: "course details fetched", data: courseDetails });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, description, price, duration, image } = req.body;
        const { id } = req.user;

        console.log("req.file====", req.file);

        if (!title || !description || !price || !duration) {
            return res.status(400).json({ message: "all properties required" });
        }

        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
        console.log("upload result=====", uploadResult);

        const newCourse = new Course({ title, description, price, duration, image: uploadResult.url, mentor: id });
        await newCourse.save();

        res.status(200).json({ message: "new course created successfully", data: newCourse });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

module.exports = { getAllCourses, getCourseDetails, createCourse };
