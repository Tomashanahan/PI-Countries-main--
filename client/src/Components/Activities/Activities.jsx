import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_activities } from "../../Redux/Actions";
import Activity from "../Activity/Activity";
import "./Activities.css";
import { Link } from "react-router-dom";

function Activities() {
	const { activities } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_activities());
	}, []);

	return (
		<div>
			{activities.length > 0 ? (
				<div className="activities_grid">
					{activities.map((activity) => {
						return <Activity key={activity.id} {...activity} />;
					})}
				</div>
			) : (
				<div className="no_activities">
					<h4>No hay actividades 🥲</h4>
					<Link to="/crear_actividad" className="no_activities-a">Crear actividad!</Link>
				</div>
			)}
		</div>
	);
}

export default Activities;
