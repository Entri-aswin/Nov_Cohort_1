const cartRouter = require('./cartRoutes')
const courseRouter = require('./courseRoutes')
const reviewRouter = require('./reviewRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/course", courseRouter )
v1Router.use("/cart", cartRouter )
v1Router.use("/review", reviewRouter )


module.exports = v1Router