const { default: axios } = require("axios");
const { Router } = require("express");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country } = require("../db");
const router = Router();

//  GET /countries: ✅
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

//  GET /countries/{idPais}: ✅
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

//  GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

//  POST /activity:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos

// GET https://restcountries.com/v3/all
// GET https://restcountries.com/v3/name/{name}
// GET https://restcountries.com/v3/alpha/{code}

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
			poblacion: country.population,
		});
	});
}
// get_countries();

//  GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado

// let aac = 'tomas'
// aac  = aac[0].toUpperCase() + aac.slice(1)
// console.log(aac)

router.get("/", async (req, res, next) => {
	const { name } = req.query;
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
		} else {
			const db_countries = await Country.findAll();
			res.json(db_countries);
		}
	} catch (error) {
		next(error);
	}
});

//  GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes

//  Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
//  Código de país de 3 letras (id) --> "cca3": "BOL",
//  Capital
//  Subregión --> "subregion"
//  Área (Mostrarla en km2 o millones de km2) --> "area"
//  Población  --> "population"
//  Actividades turísticas con toda su información asociada --> "Hacer un join"

router.get("/:idPais", async (req, res, next) => {
	const { idPais } = req.params;
	try {
		const db_countrie = await Country.findOne({ where: { id: idPais } });
		if (db_countrie) {
			let name = db_countrie.name;
			let info = await axios.get(`https://restcountries.com/v3/name/${name}`);
			if (info.data.length > 0) {
				info = info.data.map((elem) => {
					return {
						codigo: elem.cca3,
						img_bandera: elem.flags[1],
						capital: elem.capital !== undefined && elem.capital[0],
						subregion: elem.subregion,
						area: elem.area,
						poblacion: elem.population,
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
