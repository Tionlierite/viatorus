const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define(
	"users",
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_name: { type: DataTypes.STRING, allowNull: false },
		user_password: { type: DataTypes.STRING, allowNull: false }
	},
	{ freezeTableName: true, timestamps: false }
)

const City = sequelize.define(
	"cities",
	{
		city_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_name: { type: DataTypes.STRING, allowNull: false }
	},
	{ freezeTableName: true, timestamps: false }
)

const Country = sequelize.define(
	"countries",
	{
		country_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		country_name: { type: DataTypes.STRING, allowNull: false, unique: true }
	},
	{ freezeTableName: true, timestamps: false }
)

const Visit = sequelize.define(
	"visits",
	{
		visit_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		visit_date_from: { type: DataTypes.DATEONLY, allowNull: false },
		visit_date_to: { type: DataTypes.DATEONLY, allowNull: false }
	},
	{ freezeTableName: true, timestamps: false }
)

Country.hasMany(City, {
	foreignKey: { name: "country_id", allowNull: false }
})
City.belongsTo(Country, {
	foreignKey: { name: "country_id", allowNull: false }
})

City.belongsToMany(User, { through: Visit, foreignKey: "user_id" })
User.belongsToMany(City, { through: Visit, foreignKey: "city_id" })

module.exports = {
	User,
	City,
	Country,
	Visit
}
