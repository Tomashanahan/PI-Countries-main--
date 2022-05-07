const { Router } = require("express");
const { Activity } = require("../db");
const { Country } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const db_activities = await Activity.findAll();
		res.json(db_activities);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	const { name, dificultad, duracion, temporada, pais } = req.body;

	try {
		const new_activity = await Activity.create({
			name,
			dificultad,
			duracion,
			temporada,
			pais,
		});

		const db_country = await Country.findAll({
			where: { id: pais.map((e) => e) },
		});

        await new_activity.setCountries(db_country)


		res.json(db_country);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
