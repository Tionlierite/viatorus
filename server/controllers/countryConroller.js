class CityController {
	async getAll(req, res) {
		return res.json([{ message: "some from countries" }])
	}
}

module.exports = new CityController()
