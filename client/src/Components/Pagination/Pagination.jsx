import React from "react";
import "./Pagination.css";
import { useSelector } from "react-redux";

function Pagination({ pagina, setPagina }) {
	const { search_country_name, activities_contry } = useSelector(
		(state) => state
	);
	let arr = [];

	if (activities_contry.length > 0) {
		for (let i = 1; i <= activities_contry.length / 9 + 1; i++) {
			arr.push(i);
		}
	} else if(typeof activities_contry === 'string'){
		arr = []
	}else {
		for (let i = 1; i <= search_country_name.length / 9 + 1; i++) {
			arr.push(i);
		}
	}

	return (
		<div className="page">
			{typeof search_country_name !== "string" &&
				arr.map((elem) => {
					return (
						<p
							key={elem}
							className={pagina === elem ? "select" : ""}
							onClick={() => setPagina(elem)}
						>
							{elem}
						</p>
					);
				})}
		</div>
	);
}

export default Pagination;
