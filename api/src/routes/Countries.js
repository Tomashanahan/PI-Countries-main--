const { default: axios } = require("axios");
const { Router } = require("express");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country } = require("../db");
const { Activity } = require("../db");
const router = Router();

async function get_countries() {
	const info = await axios.get("https://restcountries.com/v3/all");
	const modified_data = info.data.map((country) => {
		let a = {
			capital: country.capital !== undefined && country.capital[0],
			name: country.name.common,
			img_bandera: country.flags[1],
			continente: country.continents[0],
			subregion: country.subregion,
			area: country.area,
			poblacion: country.population,
		};
		return a;
	});

	await modified_data.map((country) => {
		Country.create({
			name: country.name,
			img_bandera: country.img_bandera,
			continente: country.continente,
			capital: country.capital,
			subregion: country.subregion,
			area: country.area,
			poblacion: country.poblacion,
		});
	});
}
// get_countries()

router.get("/", async (req, res, next) => {
	const { name, order } = req.query;
	try {
		if (name) {
			const db_countries = await Country.findAll({
				where: { name: { [Op.iLike]: `%${name}%` } },
			});
			if (db_countries.length > 0) {
				res.json(db_countries);
			} else {
				res.send(`El pais "${name}" no fue encontrado`);
			}
		} else if (order === "ASC") {
			const db_countries = await Country.findAll({ order: [["name", "ASC"]] });
			res.json(db_countries);
		} else if (order === "DESC") {
			const db_countries = await Country.findAll({ order: [["name", "DESC"]] });
			res.json(db_countries);
		} else {
			const db_countries = await Country.findAll();
			res.json(db_countries);
		}
	} catch (error) {
		next(error);
	}
});

router.get("/:idPais", async (req, res, next) => {
	const { idPais } = req.params;
	try {
		const db_countrie = await Country.findOne({
			where: { id: idPais },
			include: Activity,
		});

		if (db_countrie) {
			let name = db_countrie.name;
			let info = await axios.get(`https://restcountries.com/v3/name/${name}`);
			if (info.data.length > 0) {
				info = info.data.map((elem) => {
					return {
						name: elem.name.common,
						codigo: elem.cca3,
						img_bandera: elem.flags[1],
						capital: elem.capital !== undefined && elem.capital[0],
						subregion: elem.subregion,
						area: elem.area,
						poblacion: elem.population,
						activities: db_countrie.activities,
					};
				});

				res.json(info);
			} else {
				res.send("Pais no encontrado 🥲");
			}
		} else {
			res.send("Pais no encontrado 🥲");
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
