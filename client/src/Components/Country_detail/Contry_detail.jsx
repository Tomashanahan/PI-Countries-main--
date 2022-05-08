import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_country } from "../../Redux/Actions";
import { clean_country_detail } from "../../Redux/Actions/index";

// Ruta de detalle de país: debe contener

//  Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
//  Código de país de 3 letras (id)
//  Capital
//  Subregión
//  Área (Mostrarla en km2 o millones de km2)
//  Población
//  Actividades turísticas con toda su información asociada

function CountryDetail() {
	let { id } = useParams();
	const { country } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_country(id));
		return () => dispatch(clean_country_detail());
	}, []);
	console.log(country);

	//   activities: []
	// area: 25713
	// capital: "Skopje"
	// codigo: "MKD"
	// img_bandera: "https://flagcdn.com/w320/mk.png"
	// poblacion: 2077132
	// subregion: "Southeast Europe"

	return (
		<div>
			{country.name === undefined ? (
				<h1>Cargando...</h1>
			) : (
				<>
					<h1>{country.name}</h1>
					<p>Capital: {country.capital}</p>
					<img src={country.img_bandera} alt={country.name} />
					<p>Codigo: {country.codigo}</p>
					<p>Poblacion: {country.poblacion}</p>
					<p>Area: {country.area}</p>
					<p>Subregion: {country.subregion}</p>
				</>
			)}
		</div>
	);
}

export default CountryDetail;
