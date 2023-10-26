const ApiError = require("../middleware/error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models/models")

const generateJwt = (id, email) => {
	return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" })
}

class UserController {
	async registration(req, res, next) {
		const { email, password } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest("Некорректный email или password"))
		}
		const candidate = await User.findOne({ where: { user_email: email } })
		if (candidate) {
			return next(
				ApiError.badRequest("Пользователь с таким email уже существует")
			)
		}
		const hashedPassword = await bcrypt.hash(password, 5)
		const user = await User.create({
			user_email: email,
			user_password: hashedPassword
		})
		const token = generateJwt(user.user_id, user.user_email)
		return res.json({ token })
	}

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
