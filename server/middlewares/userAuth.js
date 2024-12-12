const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decoded, "====decoded token");

        if (!decoded) {
            return res.status(401).json({ message: "user not autherized" });
        }

        req.user = decoded;
        console.log("user request=====", req.user);

        next();
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message || "Internal server Error" });
    }
};

module.exports = { userAuth };
