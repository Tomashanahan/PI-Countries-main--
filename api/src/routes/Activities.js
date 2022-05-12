const { Router } = require("express");
const { Activity } = require("../db");
const { Country } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		let db_activities = await Activity.findAll({ include: Country });

		if (db_activities) {
			db_activities = db_activities.filter((e) => e.countries.length > 0);
			res.json(db_activities);
		}
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
	const db = await Country.findOne({
		where: { id },
		include: Activity,
	});
	res.json(db.activities);
});

router.get("/activity_country", async (req, res) => {
	const { id, order, type, continente } = req.query;
	console.log(isNaN(Number("id")));
	if (isNaN(Number(id)) === false) {
		const db = await Activity.findOne({
			where: { id },
			include: Country,
		});
		if (db) {
			if (db.countries.length > 0) {
				if (order === "ASC" && type === "name" && continente) {
					let m = db.countries.sort((a, b) => (a.name > b.name ? 1 : -1)).filter(
						(country) => country.continente.includes(continente)
					);
					console.log(m);
					if (m.length > 0) {
						return res.json(m);
					} else {
						res.send(
							`No se encuentran paises con la actividad "${db.name}" en el contiente "${continente}"`
						);
					}
				} else if (order === "ASC" && type === "name") {
					let m = db.countries.sort((a, b) => (a.name > b.name ? 1 : -1)); // asc
					return res.json(m);
				} else if (order === "DESC" && type === "name" && continente) {
					let m = db.countries.sort((a, b) => (b.name > a.name ? 1 : -1)).filter(
						(country) => country.continente.includes(continente)
					);
					if (m.length > 0) {
						return res.json(m);
					} else {
						res.send(
							`No se encuentran paises con la actividad "${db.name}" en el contiente "${continente}"`
						);
					}
				} else if (order === "DESC" && type === "name") {
					let m = db.countries.sort((a, b) => (b.name > a.name ? 1 : -1)); // desc
					return res.json(m);
				} else if (order === "DESC" && type === "poblacion" && continente) {
					let m = db.countries
						.sort((a, b) => b.poblacion - a.poblacion)
						.filter((country) => country.continente.includes(continente));
					if (m.length > 0) {
						return res.json(m);
					} else {
						res.send(
							`No se encuentran paises con la actividad "${db.name}" en el contiente "${continente}"`
						);
					}
				} else if (order === "DESC" && type === "poblacion") {
					let m = db.countries.sort((a, b) => b.poblacion - a.poblacion); // desc
					return res.json(m);
				} else if (order === "ASC" && type === "poblacion" && continente) {
					let m = db.countries
						.sort((a, b) => a.poblacion - b.poblacion)
						.filter((country) => country.continente.includes(continente));
					if (m.length > 0) {
						return res.json(m);
					} else {
						res.send(
							`No se encuentran paises con la actividad "${db.name}" en el contiente "${continente}"`
						);
					}
				} else if (order === "ASC" && type === "poblacion") {
					let m = db.countries.sort((a, b) => a.poblacion - b.poblacion); // asc
					return res.json(m);
				}
			} else if (db.countries.length === 0) {
				res.send("No encontrado");
			}
		} else {
			res.send("No encontrado");
		}
	} else {
		res.send("Tu id es incorrecto");
	}
});

router.delete("/relacion/:id_actividad/:id_pais", async (req, res) => {
	const { id_actividad, id_pais } = req.params;
	const db = await Activity.findOne({ where: { id: id_actividad } });
	await db.removeCountry(id_pais);
	res.json(db);
});

module.exports = router;
