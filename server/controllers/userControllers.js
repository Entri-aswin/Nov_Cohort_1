const userDb = require("../model/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const NODE_ENV = process.env.NODE_ENV;

const register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userAlreadyExist = await userDb.findOne({ email }).select("-password");

        if (userAlreadyExist) {
            return res.status(400).json({ error: "user Already exist" });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userDb({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        const savedUser = await newUser.save();

        res.status(200).json({ message: "User created successfully", data: savedUser });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All feilds are required" });
        }

        const user = await userDb.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not exist" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        if (!user.isActive) {
            return res.status(400).json({ error: "User profile has deactivated" });
        }
        const token = generateToken(user, "user");

        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

        const { password: _, ...userWithOutPassword } = user._doc;

        res.status(200).json({ message: "login successfull", data: userWithOutPassword });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const userProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await userDb.findById(userId).select("-password");

        res.status(200).json({ message: "user profile fetched", data: userData });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.status(200).json({ message: "user logout success" });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

const checkUser = async (req, res) => {
    try {
        res.status(200).json({ message: "autherized user" });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

module.exports = { register, login, userProfile, userLogout, checkUser };
