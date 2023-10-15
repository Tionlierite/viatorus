const { City } = require("../models/models")

class CityController {
	async getCities(req, res) {
		let { limit } = req.query
		limit = limit || 5
		const city = await City.findAndCountAll({ limit })
		return res.json(city)
	}
}

module.exports = new CityController()
