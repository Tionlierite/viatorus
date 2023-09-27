class CityController {
	async getAll(req, res) {
		return res.json([
			{
				id: 1,
				city: "Gwenborough"
			},
			{
				id: 2,
				city: "Romaguera-Crona"
			},
			{
				id: 3,
				city: "Wisokyburgh"
			},
			{
				id: 4,
				city: "McKenziehaven"
			},
			{
				id: 5,
				city: "South Elvis"
			},
			{
				id: 6,
				city: "Roscoview"
			},
			{
				id: 7,
				city: "South Christy"
			},
			{
				id: 8,
				city: "Howemouth"
			},
			{
				id: 9,
				city: "Alliyaview"
			},
			{
				id: 10,
				city: "Bartholomobury"
			},
			{
				id: 11,
				city: "Lebsackbury"
			},
			{
				id: 12,
				city: "Penza"
			},
			{
				id: 13,
				city: "Klyazma"
			},
			{
				id: 14,
				city: "Moscow"
			},
			{
				id: 15,
				city: "Rabat"
			}
		])
	}
}

module.exports = new CityController()
