import React from "react";
import { Link } from "react-router-dom";
import "./Country.css";
// Pagina inicial: deben armar una landing page con

//  Alguna imagen de fondo representativa al proyecto
//  Botón para ingresar al home (Ruta principal)
// Ruta principal: debe contener

//  Input de búsqueda para encontrar países por nombre
//  Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera
// Nombre
// Continente
//  Botones/Opciones para filtrar por continente y por tipo de actividad turística
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
//  Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.

function Country({ name, img_bandera, continente,id }) {
	return (
		<div className="card_country">
			<Link to={`country_detail/${id}`} className='card_country-link'>
				<img src={img_bandera} alt={name} width={"150px"} />
				<h3>{name}</h3>
				<p className="card_country-p">{continente}</p>
			</Link>
		</div>
	);
}

export default Country;
