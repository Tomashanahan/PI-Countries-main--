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

		await new_activity.setCountries(db_country);

		res.json(db_country);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;

	try {
		await Activity.destroy({ where: { id } });
		res.send("Tarea eliminada con exito");
	} catch (error) {
		next(error);
	}
});

router.get("/relacion", async (req, res) => {
	const { id } = req.query;
	const db = await Country.findOne({ where: { id }, include: Activity });
	res.json(db.activities);
});

router.get("/activity_country", async (req, res) => {
	const { id } = req.query;
	const db = await Activity.findOne({ where: { id }, include: Country });
	if (db) {
		if (db.countries.length > 0) {
			res.json(db.countries);
		} else if (db.countries.length === 0) {
			res.send("No encontrado");
		}
	} else {
		res.send("No encontrado");
	}
});

router.delete("/relacion/:id_actividad/:id_pais", async (req, res) => {
	const { id_actividad, id_pais } = req.params;
	const db = await Activity.findOne({ where: { id: id_actividad } });
	await db.removeCountry(id_pais);
	res.json(db);
});

module.exports = router;
