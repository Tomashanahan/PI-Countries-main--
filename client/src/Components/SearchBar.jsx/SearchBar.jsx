import React, { useState } from "react";
import "./SearchBar.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_country_by_name } from "../../Redux/Actions/index";
import { useSelector } from "react-redux";

function SearchBar() {
	const [inputValue, setInputValue] = useState("");
	const [alphabetic_order, setAlphabetic_order] = useState("");
	const [continent, setContinent] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_country_by_name(inputValue, alphabetic_order || 'ASC'));
	}, [alphabetic_order, inputValue]);
	console.log("Componente Continent->", continent);

	return (
		<div className="search_bar">
			<div className="">
				<input
					type="text"
					placeholder="Buscar"
					autoFocus
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
			<div className="">
				<select
					name="alfabeticamente"
					onChange={(e) => setAlphabetic_order(e.target.value)}
				>
					<option value="ASC">A-Z</option>
					<option value="DESC">Z-A</option>
				</select>
			</div>
			<div className="">
				<select name="continente" onChange={e => setContinent(e.target.value)}>
					<option value="">Continente</option>
					<option value="Asia">Asia</option>
					<option value="America">América</option>
					<option value="Africa">Africa</option>
					<option value="Antartida">Antártida</option>
					<option value="Europa">Europa</option>
					<option value="Oceania">Oceanía</option>
				</select>
			</div>
			<div className="">
				<select name="poblacion">
					<option value="">Poblacion</option>
					<option value="asc">Asc</option>
					<option value="desc">Desc</option>
				</select>
			</div>
			<div className="">
				<select name="actividad">
					<option value="">Actividad</option>
					<option value="asc">Asc</option>
					<option value="desc">Desc</option>
				</select>
			</div>
		</div>
	);
}

export default SearchBar;
