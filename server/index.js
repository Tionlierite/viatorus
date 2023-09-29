require("dotenv").config()
const express = require("express")
const router = require("./routes/index")
const sequelize = require("./db")
const models = require("./models/models")
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/api", router)

async function startApp() {
	try {
		await sequelize.authenticate()
		/*await sequelize.drop()
		console.log("All tables dropped!")*/
		await sequelize.sync()
		app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT))
	} catch (e) {
		console.log(e)
	}
}

startApp()
