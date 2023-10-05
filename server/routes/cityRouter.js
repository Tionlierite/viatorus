const Router = require("express")
const router = new Router()
const cityController = require("../controllers/cityController")

router.get("/getCity", cityController.getAll)

module.exports = router
