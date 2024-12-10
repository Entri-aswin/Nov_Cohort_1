const courseRouter = require('./courseRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/course", courseRouter )


module.exports = v1Router