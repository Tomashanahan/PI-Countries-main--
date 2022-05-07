import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_countries } from "../../Redux/Actions/index";
import Country from "../Country/Country";

import './Countries.css'

function Countries() {
	const { countries } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_countries());
	}, []);

	console.log(countries);

	return (
		<div className="countries_grid">
			{countries.length === 0 ? (
				<h1>Cargando...</h1>
			) : (
				countries.map((country) => {
					return <Country key={country.id} {...country} />;
				})
			)}
		</div>
	);
}

export default Countries;
