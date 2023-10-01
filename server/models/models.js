const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define(
	"user",
	{
		user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_name: { type: DataTypes.STRING, allowNull: false },
		user_password: { type: DataTypes.STRING, allowNull: false }
	},
	{ freezeTableName: true, timestamps: false }
)

const City = sequelize.define(
	"city",
	{
		city_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		user_name: { type: DataTypes.STRING, allowNull: false }
	},
	{ freezeTableName: true, timestamps: false }
)

const Country = sequelize.define(
	"country",
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
	"visit",
	{
		visit_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		visit_date_from: { type: DataTypes.DATE, allowNull: false },
		visit_date_to: { type: DataTypes.DATE, allowNull: false }
	},
	{ freezeTableName: true, timestamps: false }
)

Country.hasMany(City)
City.belongsTo(Country)

City.belongsToMany(User, { through: Visit })
User.belongsToMany(City, { through: Visit })

module.exports = {
	User,
	City,
	Country,
	Visit
}
