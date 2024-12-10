const { register, login, userProfile, userLogout, checkUser } = require("../../controllers/userControllers");
const { upload } = require("../../middlewares/multer");
const { userAuth } = require("../../middlewares/userAuth");

const userRouter = require("express").Router();

userRouter.post("/signup", upload.single("profilePic"), register);
userRouter.post("/login", login);

userRouter.get("/profile", userAuth, userProfile);
userRouter.get("/logout", userAuth, userLogout);

userRouter.put("/update-profile");
userRouter.put("/forgot-password");
userRouter.put("/deactive");

userRouter.get("/check-user", userAuth, checkUser);

module.exports = userRouter;
