const { getCart, addCourseToCart, removeCourseFromCart, clearCart } = require("../../controllers/cartControllers");
const { userAuth } = require("../../middlewares/userAuth");

const cartRouter = require("express").Router();

cartRouter.get("/get-cart", userAuth, getCart);
cartRouter.post("/add-to-cart", userAuth, addCourseToCart);
cartRouter.delete("/remove-from-cart", userAuth, removeCourseFromCart);
cartRouter.delete("/clear-cart", userAuth, clearCart);

module.exports = cartRouter;
