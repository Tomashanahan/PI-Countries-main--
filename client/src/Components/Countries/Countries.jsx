import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_countries } from "../../Redux/Actions/index";
import Country from "../Country/Country";

import "./Countries.css";

function Countries() {
	const { search_country_name, countries_sorted } = useSelector((state) => state);

	return (
		<div>
			{typeof search_country_name !== "string" && search_country_name.length > 0 ? (
				<div className="countries_grid">
					{search_country_name.map((country) => {
						return <Country key={country.id} {...country} />;
					})}
				</div>
			) : typeof search_country_name === "string" ? (
				<div className="pais_no_encontrado">
					<h3>{search_country_name} 🥲</h3>
				</div>
			) : (
				<h3>Cargando...</h3>
			)}
		</div>
	);
}

export default Countries; 