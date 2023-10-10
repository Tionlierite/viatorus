const Router = require("express")
const router = new Router()

const cityRouter = require("./cityRouter")
const userRouter = require("./userRouter")
const countryRouter = require("./countryRouter")

router.use("/city", cityRouter)
router.use("/country", countryRouter)
router.use("/user", userRouter)

module.exports = router
