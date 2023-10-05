class CityController {
	async getAll(req, res) {
		return res.json([{ message: "some" }])
	}
}

module.exports = new CityController()
