import React from "react";
import { Link } from "react-router-dom";
import "./Country.css";

function Country({ name, img_bandera, continente, id }) {
	return (
		<div className="card_country">
			<div className="im">
				<img src={img_bandera} alt={name} width={"170px"} height="120px" />
			</div>
			<div className="img_arriba">
				<img src={img_bandera} alt={name} width={"170px"} height="100px" />
			</div>
			<Link to={`country_detail/${id}`} className="card_country-link">
				<h3>{name}</h3>
				<p className="card_country-p">{continente}</p>
			</Link>
		</div>
	);
}

export default Country;
