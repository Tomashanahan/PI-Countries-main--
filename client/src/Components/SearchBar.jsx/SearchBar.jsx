import React, { useState } from "react";
import "./SearchBar.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	get_activities_country,
	get_country_by_name,
	get_activities,
	clean_get_activities_country,
} from "../../Redux/Actions/index";

function SearchBar({ setPagina }) {
	const { activities, activities_contry } = useSelector((state) => state);
	const [inputValue, setInputValue] = useState("");
	const [order, setOrder] = useState("");
	const [continent, setContinent] = useState("");
	const [select_tipo, setSelect_tipo] = useState("");
	const [activity, setActivity] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		if (activities_contry.length === 0) {
			dispatch(
				get_country_by_name(
					inputValue.trim(),
					order || "ASC",
					continent,
					select_tipo || "name"
				)
			);
			dispatch(get_activities());
			setPagina(1);
		}
		if (activity !== "") {
			dispatch(
				get_activities_country(
					activity.trim(),
					order || "ASC",
					select_tipo || "name",
					continent,
					inputValue
				)
			);
			console.log(order);
		} else if (activity === "") {
			dispatch(clean_get_activities_country());
			dispatch(
				get_country_by_name(
					inputValue.trim(),
					order || "ASC",
					continent,
					select_tipo || "name"
				)
			);
		}
	}, [order, inputValue, continent, select_tipo, activity]);

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
					name="poblacion"
					onChange={(e) => setSelect_tipo(e.target.value)}
				>
					<option value="name">Alfabéticamente</option>
					<option value="poblacion">Población</option>
				</select>
			</div>
			<div className="">
				<select name="order" onChange={(e) => setOrder(e.target.value)}>
					<option value="ASC">Asc</option>
					<option value="DESC">Desc</option>
				</select>
			</div>
			<div className="">
				<select
					name="continente"
					onChange={(e) => setContinent(e.target.value)}
				>
					<option value="">Todos los Continentes</option>
					<option value="Asia">Asia</option>
					<option value="America">América</option>
					<option value="Africa">Africa</option>
					<option value="Antarctica">Antártida</option>
					<option value="Europe">Europa</option>
					<option value="Oceania">Oceanía</option>
				</select>
			</div>
			<div className="">
				<select name="actividad" onChange={(e) => setActivity(e.target.value)}>
					<option value="">Actividad</option>
					{activities.length > 0 &&
						activities.map((activity) => {
							return (
								<option key={activity.id} value={activity.id}>
									{activity.name}
								</option>
							);
						})}
				</select>
			</div>
		</div>
	);
}

export default SearchBar;
