const { default: axios } = require("axios");
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country } = require("../db");

const router = Router();
//  GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.

//  GET /countries/{idPais}:
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
        console.log(country.capital !== undefined && country.capital[0])
        // console.log(country.capital.map(e => e))
		let a ={
			capital: country.capital !== undefined && country.capital[0], 
            name: country.name.common,
			img_bandera: country.flags[1],
			continente: country.continents[0],
		};
        return a 
	});

	await modified_data.map((country) => {
		Country.create({
			name: country.name,
			img_bandera: country.img_bandera,
			continente: country.continente,
			capital: country.capital,
		});
	});
}
get_countries();

router.get("/", async (req, res, next) => {
	const db_countries = await Country.findAll();
	res.send(db_countries);
});

//  GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes




module.exports = router;
