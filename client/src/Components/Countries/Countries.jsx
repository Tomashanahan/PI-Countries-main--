import React from "react";
import { useSelector } from "react-redux";
import Country from "../Country/Country";
import Pagination from "../Pagination/Pagination";
import "./Countries.css";

function Countries({ pagina, setPagina }) {
	const { search_country_name, activities_contry } = useSelector(
		(state) => state
	);

	return (
		<div>
			{activities_contry.length > 0 && typeof activities_contry !== "string" ? (
				<div className="countries_grid">
					{activities_contry
						.slice((pagina - 1) * 9, (pagina - 1) * 9 + 9)
						.map((country) => {
							return <Country key={country.id} {...country} />;
						})}
				</div>
			) : typeof activities_contry === "string" ? (
				<div className="pais_no_encontrado">
					<h3>{activities_contry}</h3>
				</div>
			) : typeof search_country_name !== "string" &&
			  search_country_name.length > 0 ? (
				<div className="countries_grid">
					{search_country_name
						.slice((pagina - 1) * 9, (pagina - 1) * 9 + 9)
						.map((country) => {
							return <Country key={country.id} {...country} />;
						})}
				</div>
			) : typeof search_country_name === "string" ? (
				<div className="pais_no_encontrado">
					<h3>{search_country_name} 🥲</h3>
				</div>
			) : (
				<>
					<iframe
						src="https://giphy.com/embed/RHEqKwRZDwFKE"
						width="480"
						height="204"
						frameBorder="0"
						className="giphy-embed"
						allowFullScreen
					></iframe>
				</>
			)}

			{typeof activities_contry !== "string" && (
				<Pagination pagina={pagina} setPagina={setPagina} />
			)}
		</div>
	);
}

export default Countries;
