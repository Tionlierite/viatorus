const Router = require("express")
const router = new Router()

const cityRouter = require("./cityRouter")
const userRouter = require("./userRouter")

router.use("/city", cityRouter)
router.use("/user", userRouter)

module.exports = router
