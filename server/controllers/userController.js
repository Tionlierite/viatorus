const ApiError = require("../middleware/error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models/models")

const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: "24h"
	})
}

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body
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
			user_password: hashedPassword,
			user_role: role
		})
		const token = generateJwt(user.user_id, user.user_email, user.user_role)
		return res.json({ token })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { user_email: email } })
		if (!user)
			return next(ApiError.badRequest("Пользователь с таким email не найден."))

		const comparePassword = bcrypt.compareSync(password, user.user_password)
		if (!comparePassword)
			return next(ApiError.badRequest("Указан неверный пароль."))

		const token = generateJwt(user.user_id, user.user_email, user.user_role)
		return res.json({ token })
	}
	async check(req, res) {
		console.log(req.user)
		const token = generateJwt(req.user.id, req.user.email, req.user.role)
		return res.json({ token })
	}
}
module.exports = new UserController()
