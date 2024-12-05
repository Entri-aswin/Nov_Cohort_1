const productRouter = require('./productRoutes')
const userRouter = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/product", productRouter)


module.exports = v1Router