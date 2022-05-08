import React from "react";

function SearchBar() {
	return (
		<div>
			<input type="text" placeholder="Buscar"/>
			<select name="alfabeticamente">
				<option value="A-Z">A-Z</option>
				<option value="Z-A">Z-A</option>
			</select>
			<select name="continente">
				<option value="Asia">Asia</option>
				<option value="America">América</option>
				<option value="Africa">Africa</option>
				<option value="Antartida">Antártida</option>
				<option value="Europa">Europa</option>
				<option value="Oceania">Oceanía</option>
			</select>
			<select name="poblacion">
				<option value="Asia">Asia</option>
				<option value="America">América</option>
				<option value="Africa">Africa</option>
				<option value="Antartida">Antártida</option>
				<option value="Europa">Europa</option>
				<option value="Oceania">Oceanía</option>
			</select>
		</div>
	);
}

export default SearchBar;
