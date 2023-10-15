const Router = require("express")
const router = new Router()
const countryController = require("../controllers/countryConroller")

router.get("/", countryController.getCountries)

module.exports = router
