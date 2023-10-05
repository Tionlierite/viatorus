const ApiError = require("../middleware/error/ApiError")

class UserController {
	async registration(res, req) {}
	async login(res, req) {}
	async check(req, res, next) {
		const { id } = req.query
		if (!id) {
			return next(ApiError.badRequest("Отсутствует ID"))
		}
		res.json(id)
	}
}
module.exports = new UserController()
