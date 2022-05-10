import React from "react";
import './Activity.css'
// dificultad: 1
// duracion: 2
// id: 2
// name: "tomas"
// temporada: "Otoño"

function Activity({ name, duracion, dificultad, temporada }) {
	return (
		<div className="pais">
				<h1>{name}</h1>
				<p>Duracion: {duracion}</p>
				<p>Dificultad: {dificultad}</p>
				<p>Temporada: {temporada}</p>
		</div>
	);
}

export default Activity;
