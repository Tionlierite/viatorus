const { Country } = require("../models/models")

class CountryController {
	async getCountries(req, res) {
		let { limit } = req.query
		limit = limit || 5
		const country = await Country.findAndCountAll({ limit })
		return res.json(country)
	}
}

module.exports = new CountryController()
