import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_country } from "../../Redux/Actions";
import {
	clean_country_detail,
	get_country_activities,
	delete_activity_of_country,
} from "../../Redux/Actions/index";
import "./Country_detail.css";
import cargando from "../../img/Spinner-1s-200px.gif";

function CountryDetail() {
	let { id } = useParams();
	const { country, country_activities } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_country(id));
		dispatch(get_country_activities(id));
		return () => dispatch(clean_country_detail());
	}, []);
	const _area =
		country !== undefined
			? new Intl.NumberFormat("de-DE", { maximumSignificantDigits: 3 }).format(
					country.area
			  )
			: "Undefined";
	const poblacion =
		country !== undefined
			? new Intl.NumberFormat("de-DE", { maximumSignificantDigits: 3 }).format(
					country.poblacion
			  )
			: "Undefined";

	function delete_action(id_actividad) {
		dispatch(delete_activity_of_country(id_actividad, id));
		window.location.reload();
	}

	return (
		<div className="detalle">
			{country.name === undefined ? (
				<>
					<iframe
						src="https://giphy.com/embed/RHEqKwRZDwFKE"
						width="480"
						height="204"
						frameBorder="0"
						class="giphy-embed"
						allowFullScreen
					></iframe>
				</>
			) : (
				<div className="pais_detalle">
					<h1>{country.name}</h1>
					<div className="caja_detalle">
						<div className="">
							<div className="pais_detalle_img">
								<img
									src={country.img_bandera}
									alt={country.name}
									width={"350px"}
								/>
							</div>
							<div className="pais_detalle_img_arriba_1">
								<img
									className="pais_detalle_img_arriba"
									src={country.img_bandera}
									alt={country.name}
								/>
							</div>
						</div>
						<div className="pais_detalle_info">
							<p>
								Capital: <span>{country.capital}</span>
							</p>
							<p>
								Codigo: <span>{country.codigo}</span>
							</p>
							<p>
								Poblacion: <span>{poblacion}</span>
							</p>
							<p>
								Area:{" "}
								<span>
									{country?.area > 1000000 ? _area + " Mill " : _area} km2
								</span>
							</p>
							<p>
								Subregion: <span>{country.subregion}</span>
							</p>
						</div>
					</div>
				</div>
			)}
			<div
				className={
					country_activities.length > 1
						? "actividad_pais_grid"
						: "actividad_pais_flex"
				}
			>
				{country_activities.length > 0 &&
					country.name !== undefined &&
					country_activities.map((activity) => {
						return (
							<div className="actividad_pais" key={activity.id}>
								<button onClick={() => delete_action(activity.id)}>X</button>
								<h1>{activity.name}</h1>
								<p>Dificultad: {activity.dificultad}</p>
								<p>Duracion: {activity.duracion}</p>
								<p>Temporada: {activity.temporada}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default CountryDetail;
